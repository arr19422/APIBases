// 'use strict'

const express = require('express')
const api = express.Router()

const Controller = require('../controllers/controler')

api.get('/', (request, response) => {
    console.log('llega')
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


//User
api.get('/user/login/', Controller.loginUser)
api.post('/user/register/', Controller.registerUser)
api.get('/user/streams/', Controller.getDayStreamsPerUser)
api.put('/user/sub/', Controller.updateUserSub)

//Manager
api.post('/user/manager/', Controller.postManager)

//Album
api.put('/user/album/', Controller.modifyAlbum)
api.delete('/user/album/', Controller.deleteAlbum)

//Artista
api.post('/user/artist/', Controller.postArtist)
api.put('/user/artist/', Controller.modifyArtist)
api.delete('/user/artist/', Controller.deleteArtist)

//Cancion
api.put('/user/cancion/inab/', Controller.inabCanciones)
api.put('/user/cancion/', Controller.modifyCancion)
api.delete('/user/cancion/', Controller.deleteCancion)

//Playlist
api.post('/user/playlist/', Controller.postPlaylist)
api.post('/user/contiene/', Controller.postSongIntoPlaylist)


module.exports = api