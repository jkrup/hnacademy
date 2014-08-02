mongoose = require 'mongoose'
config = require './config'
Schema   = mongoose.Schema
ObjectId = Schema.ObjectId

# Connect to Mongo
mongoose.connect(config.mongoUrl, config.mongoOptions)

# Exports.
db = exports
db.db = mongoose.connection
db.ObjectId = mongoose.Types.ObjectId
db.close = db.db.close.bind(db.db)

## Schemas =====================================================================
CourseSchema = new Schema  # DB Collection
    urlslug: {type: String, unique: true, required: true}
    createdAt: {type: Date, default: Date.now}
    modifiedAt: {type: Date}

    title: {type: String, required: true}
    author: String
    coverUrl: String
    
    slides: [{}]

    originalText: {type: String}


## Instantiate =================================================================
db.Course = db.db.model 'Course', CourseSchema


