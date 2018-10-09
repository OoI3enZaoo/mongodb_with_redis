const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: Number,
  name: String,
})

roomSchema.path('number').required(true, 'number of room cannot be blank')
roomSchema.path('name').required(true, 'name of room cannot be blank')



module.exports = mongoose.model('Room', roomSchema)
