
express = require 'express'

app = module.exports = new express.Router()

# Main page + course list
app.get '/', (req, res) ->
    res.render "index.html"


app.param ':course', (courseId, req, res, next) ->
    db.Course.findOne {urlslug: courseId}, errTo next, (course) ->
        if not course? 
            return next 'route'

        req.course = res.locals.course = course
        next()


app.get '/:course', (req, res, next) ->
    res.render "course.html"

