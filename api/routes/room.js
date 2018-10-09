const express = require('express')

const router = express.Router()
const RoomController = require('../controllers/room')

router.get('/', RoomController.rooms_getAll)
router.get('/:roomId', RoomController.rooms_byId)

router.delete('/:roomId', RoomController.rooms_remove)

router.post('/', RoomController.room_addRoom)

router.patch('/:roomId', RoomController.room_update)
module.exports = router
