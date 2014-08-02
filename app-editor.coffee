
express = require 'express'
errTo = require 'errto'
yaml = require 'js-yaml'
db = require './db'

app = module.exports = new express.Router()

app.get '/', (req, res, next) ->
    if req.originalUrl[req.originalUrl.length-1] != '/'
        return res.redirect req.originalUrl + "/"

    db.Course.find().sort("-createdAt").exec errTo next, (courses) ->
        res.render 'editor/index.jade', {courses}

app.param ':course', (req, res, next, courseId) ->
    db.Course.findOne {urlslug: courseId}, errTo next, (course) ->
        if not course? 
            return next 'route'

        req.course = res.locals.course = course
        next()


app.get '/courses/new', (req, res, next) ->
    res.render 'editor/course-edit.jade'

app.get '/courses/:course', (req, res, next) ->
    res.render 'editor/course-edit.jade'


yaml2course = (text) ->
    data = yaml.safeLoad(text)
    data.originalText = text
    data.modifiedAt = Date.now()
    data


app.post '/courses/new', (req, res, next) ->
    db.Course.create yaml2course(req.body.text), errTo next, (course) ->
        res.json(course)
, (err, req, res, next) ->
    res.status(400).send ""+err

app.post '/courses/:course', (req, res, next) ->
    req.course.update yaml2course(req.body.text), errTo next, ->
        db.Course.findById req.course._id, errTo next, (course) ->
            res.json(course)
, (err, req, res, next) ->
    res.status(400).send ""+err

app.delete '/courses/:course', (req, res, next) ->
    req.course.remove errTo next, ->
        res.status(204).end()
