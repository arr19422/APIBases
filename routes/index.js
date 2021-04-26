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
api.post('/user/streams/', Controller.getDayStreamsPerUser)
api.put('/user/sub/', Controller.updateUserSub)
api.post('/user/probe/', Controller.probeArtist)
api.post('/user/probeM/', Controller.probeManager)

//Manager
api.post('/manager/', Controller.postManager)

//Album
api.put('/album/', Controller.modifyAlbum)
api.delete('/album/', Controller.deleteAlbum)
api.get('/album/', Controller.getAlbum)
api.post('/album/getalbum', Controller.getSearchAlbum)

//Artista
api.post('/artist/', Controller.postArtist)
api.put('/artist/', Controller.modifyArtist)
api.delete('/artist/', Controller.deleteArtist)
api.get('/artist/', Controller.getArtist)
api.post('/artist/getartist',Controller.getSearchArtist)

//Cancion
api.put('/cancion/inab/', Controller.inabCanciones)
api.put('/cancion/', Controller.modifyCancion)
api.post('/cancion/del', Controller.deleteCancion)
api.get('/cancion/', Controller.getSongs)
api.post('/cancion/link', Controller.getLinkSongs)
api.post('/cancion/getsong', Controller.getSearchSong)

//Genre
api.post('/genero/name', Controller.getSearchGenre)

//Playlist
api.post('/playlist/', Controller.postPlaylist)
api.post('/playlist/contiene/', Controller.postSongIntoPlaylist)
api.post('/contiene/songs', Controller.getSongsIntoPlaylist)
api.post('/playlist/get/', Controller.getPlaylists)
api.post('/playlist/get/search', Controller.getSearchSongInPlaylist)


//Stream
api.post('/stream/', Controller.postStream)

//Report
api.get('/report/1', Controller.getReport1)
api.get('/report/2', Controller.getReport2)
api.get('/report/3', Controller.getReport3)
api.get('/report/4', Controller.getReport4)
api.get('/report/5', Controller.getReport5)
api.get('/report/6', Controller.getReport6)


module.exports = api