
express = require 'express'
errTo = require 'errto'
db = require './db'

app = module.exports = new express.Router()

app.get '/', (req, res, next) ->
    if req.originalUrl[req.originalUrl.length-1] != '/'
        return res.redirect req.originalUrl + "/"

    db.Course.find {}, errTo next, (courses) ->
        res.render 'editor/index.html', {courses}

app.get '/courses/new', (req, res, next) ->
    res.render 'editor/course-edit.html'

app.get '/courses/:course', (req, res, next) ->
    res.render 'editor/course-edit.html'

app.post '/courses/', (req, res, next) ->

