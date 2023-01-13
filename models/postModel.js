const mongoose = require("mongoose")

const Schema = mongoose.Schema
const objectId = Schema.objectId;

const PostSchema = new Schema({
    title: { type: String, required: [true, "Please provide a title"] },

    body: { type: String },

    image: {},

    user: { type: String, ref: "User" }

})


module.exports = {PostSchema}