const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(`mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`
  , { useNewUrlParser: true })


app.use(bodyParser.urlencoded({
    extended: false,
}))
app.use(bodyParser.json({limit:'50mb'}))
app.use(morgan('dev'))



const roomRoute = require('./api/routes/room')
app.use('/room', roomRoute)

module.exports = app
