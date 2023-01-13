const mongoose = require("mongoose")

const Schema = mongoose.Schema
const objectId = Schema.objectId;

const UserSchema = new Schema({
    name: { type: String, required: [true, "Please provide a name"] },

    email: { type: String, required: [true, "Please provide your email"], unique: true },

    password: { type: String, required: true, select: false }

}, { timestamps: true })

module.exports = { UserSchema };