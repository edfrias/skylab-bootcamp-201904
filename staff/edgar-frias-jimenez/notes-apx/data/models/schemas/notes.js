const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NoteSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = NoteSchema
