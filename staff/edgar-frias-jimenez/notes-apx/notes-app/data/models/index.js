const mongoose = require('mongoose')
const schemas = require('./schemas')

const {
    UserSchema,
    NoteSchema
} = schemas

const model = mongoose.model.bind(mongoose)

module.exports = {
    User: model('User', UserSchema),
    Note: model('Note', NoteSchema)
}
