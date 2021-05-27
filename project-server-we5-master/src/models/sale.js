const mongoose = require('mongoose')

const PETS_TYPE = ['DOG', 'CAT', 'FISH', 'HORSE']

const SaleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  petType: {
    type: String,
    enum: PETS_TYPE
  },
  breed: {
    type: String
  },
  color: {
    type: String
  },
  age: {
    type: Number
  },
  description: {
    type: String
  },
  title: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  price: {
    type: Number
  },
  phoneNumber: {
    type: String
  },
  photoURL:{
    type: String
  }
})

module.exports = mongoose.model('Sale', SaleSchema)
