const mongoose = require('mongoose');
const Schema = mongoose.Schema

//CREATE A SCHEMA

const PostSchema = new Schema({
    title:String,
    detail:String,
    dateCreated:{
        type:Date,
        default: Date.now
    }
    
})

const post = mongoose.model('Post', PostSchema)

module.exports = post