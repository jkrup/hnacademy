
express = require 'express'
errTo = require 'errto'
db = require './db'

app = module.exports = new express.Router()

# Main page + course list
app.get '/', (req, res, next) ->
    db.Course.find().sort("-createdAt").exec errTo next, (courses) ->
        res.render "index.html", {courses}


app.param ':course', (req, res, next, courseId) ->
    db.Course.findOne {urlslug: courseId}, errTo next, (course) ->
        if not course? 
            return next 'route'

        req.course = res.locals.course = course
        next()

app.get '/:course', (req, res, next) ->
    res.render "course.html"
