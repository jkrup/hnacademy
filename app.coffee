
express = require 'express'
errTo = require 'errto'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
logger = require 'morgan'
errorHandler = require 'errorhandler'
mixin = require 'express/node_modules/utils-merge'
config = require './config'

require './express-helpers'

app = express()

if config.env == 'development'
    app.use require('less-middleware')("./public")
    app.use require('coffee-middleware')("./public")
    app.use express.static "./public"  # In production, nginx serves ./public directly.

app.set 'trust proxy', config.trustProxy  # Trust nginx headers (needed to check https)
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: true)
app.use cookieParser()
app.use logger config.logFormat

app.engine 'html', require('hbs').__express
app.engine 'jade', require('jade').renderFile
mixin app.locals, {config}

# Main views.
app.use require './app-views'




if config.env == 'development'
    app.use errorHandler()

app.listen config.http.port, config.http.host, (err) ->
    if err? then return console.log "Error listening: ", err
    console.log "Listening at #{config.http.host}:#{config.http.port}. (#{config.projectName})"
