
express = require 'express'
errTo = require 'errto'
db = require './db'
hbs = require 'hbs'
MobileDetect = require 'mobile-detect'

app = module.exports = new express.Router()

# Main page + course list
app.get '/', (req, res, next) ->
    md = new MobileDetect req.headers['user-agent']
    if not md.mobile() and not req.query.mobile
        return res.render '../public/landing.html'

    db.Course.find().sort("createdAt").exec errTo next, (courses) ->
        res.render "index.jade", {courses}


app.param ':course', (req, res, next, courseId) ->
    db.Course.findOne {urlslug: courseId}, errTo next, (course) ->
        if not course? 
            return next 'route'

        req.course = res.locals.course = course
        next()

app.get '/:course', (req, res, next) ->
    res.render "course.jade"

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper 'ifCond', (v1, v2, options) ->
    if(v1 == v2)
      options.fn(this)
    else
      options.inverse(this)
