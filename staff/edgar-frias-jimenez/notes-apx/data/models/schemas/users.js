const mongoose = require('mongoose')
const { isEmail } = require('validator')

const Schema = mongoose.Schema

const UserSchema = new Schema ({
  name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail
    },
    password: { type: String, required: true },
    // notes: [note]
})

module.exports =  UserSchema
