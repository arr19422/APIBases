// 'use strict'

const express = require('express')
const api = express.Router()

const UserController = require('../controllers/User')

api.get('/', (request, response) => {
    console.log('llega')
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


//User
api.get('/user/login/', UserController.loginUser)
api.post('/user/register/', UserController.registerUser)
api.get('/user/streams/', UserController.getDayStreamsPerUser)
api.put('/user/sub/', UserController.updateUserSub)
api.post('/user/artist/', UserController.postArtist)
api.post('/user/manager/', UserController.postManager)
api.put('/user/cancion/inab/', UserController.inabCanciones)
api.put('/user/album/', UserController.modifyAlbum)
api.put('/user/artist/', UserController.modifyArtist)
api.put('/user/cancion/', UserController.modifyCancion)

module.exports = api