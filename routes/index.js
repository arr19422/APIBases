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

api.put('/user/album/', UserController.modifyAlbum)
api.delete('/user/album/', UserController.deleteAlbum)

api.put('/user/artist/', UserController.modifyArtist)
api.delete('/user/artist/', UserController.deleteArtist)

api.put('/user/cancion/inab/', UserController.inabCanciones)
api.put('/user/cancion/', UserController.modifyCancion)
api.delete('/user/cancion/', UserController.deleteCancion)

api.post('/user/playlist/', UserController.postPlaylist)
api.post('/user/contiene/', UserController.postSongIntoPlaylist)



module.exports = api