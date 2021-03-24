// 'use strict'

const express = require('express')
const api = express.Router()

const Controller = require('../controllers/controler')

api.get('/', (request, response) => {
    console.log('llega')
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


//User
api.post('/user/login/', Controller.loginUser)
api.post('/user/register/', Controller.registerUser)
api.get('/user/streams/', Controller.getDayStreamsPerUser)
api.put('/user/sub/', Controller.updateUserSub)

//Manager
api.post('/manager/', Controller.postManager)

//Album
api.put('/album/', Controller.modifyAlbum)
api.delete('/album/', Controller.deleteAlbum)
api.get('/album/', Controller.getAlbum)

//Artista
api.post('/artist/', Controller.postArtist)
api.put('/artist/', Controller.modifyArtist)
api.delete('/artist/', Controller.deleteArtist)
api.get('/artist/', Controller.getArtist)

//Cancion
api.put('/cancion/inab/', Controller.inabCanciones)
api.put('/cancion/', Controller.modifyCancion)
api.delete('/cancion/', Controller.deleteCancion)
api.get('/cancion/', Controller.getSongs)

//Playlist
api.post('/playlist/', Controller.postPlaylist)
api.post('/contiene/', Controller.postSongIntoPlaylist)
api.get('/contiene/', Controller.getSongsIntoPlaylist)
api.get('/playlist/', Controller.getPlaylists)

//Stream
api.post('/stream/', Controller.postStream)

//Report
api.get('/report/1', Controller.getReport1)
api.get('/report/3', Controller.getReport3)
api.get('/report/4', Controller.getReport4)
api.get('/report/5', Controller.getReport5)
api.get('/report/6', Controller.getReport5)


module.exports = api