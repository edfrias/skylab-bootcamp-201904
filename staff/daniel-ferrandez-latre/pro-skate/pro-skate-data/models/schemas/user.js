const { Schema } = require('mongoose')
const { isEmail , isURL } = require('validator')

const user = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  imageUrl: { type: String,
              validate: isURL
            },
  email: {
      type: String,
      required: true,
      unique: true,
      validate: isEmail
  },
  password: { type: String, required: true },
  age: Number,
  date: { type: Date, default: Date.now },
  cart: [ { quantity: { type: Number, required: true }, productId: { type: Schema.Types.ObjectId, ref: 'Product' } } ],
  wishlist: [{type: Schema.Types.ObjectId, ref: 'Product'} ],
  historic: [{ quantity: { type: Number, required: true }, productId: { type: Schema.Types.ObjectId, ref: 'Product' }, date : { type: Date, default: Date.now } }],
  isAdmin: {type: Boolean, default: false, required: true}
})

module.exports = user