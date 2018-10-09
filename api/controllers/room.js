const mongoose = require('mongoose')
const Room = require('../models/room')
const cache = require('../../helpers/cache')

exports.rooms_getAll = async (req, res) => {
  const dataFromCache = await cache.getData('rooms_03')
  if (!dataFromCache) {
    Room.find()
      .exec()
      .then (docs => {
        cache.setData('rooms_03', docs)
        res.status(200).json({docs})
      })
      .catch (error => res.status(500).json({error}))
  } else {
    res.status(200).json(dataFromCache)
  }

}
exports.rooms_byId = (req, res) => {
  const { roomId } = req.params
  Room.findById(roomId)
    .exec()
    .then(doc => {
      res.status(200).send(doc)
    })
    .catch(error => res.status(200).json({error}))
}

exports.room_addRoom = (req, res) => {
  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    number: 23,
    name: 'hello'
  })
  room.save().then(result => {
    res.status(200).json({result})

  })
  .catch(error => res.status(500).json({error}))
}

exports.room_update = (req, res) => {
  const { roomId } = req.params
  const updateOps = {}
  for (const key of Object.keys(req.body)) {
  updateOps[key] = req.body[key]
}
  Room.update({_id: roomId}, { $set: updateOps })
    .exec()
    .then (doc => res.status(200).json({doc}))
    .catch (error => res.status(500).json({error}))
}
exports.rooms_remove = (req, res) => {
  const { roomId } = req.params
  Room.remove({_id: roomId})
    .exec()
    .then (doc => res.status(200).json({doc}))
    .catch (error => res.status(500).json({error}))
}
