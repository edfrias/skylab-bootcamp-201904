const { Schema } = require('mongoose')
const NoteSchema = require('./notes')
const { isEmail } = require('validator')

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
    notes: [NoteSchema]
})

module.exports =  UserSchema
