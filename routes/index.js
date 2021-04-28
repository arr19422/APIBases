// 'use strict'

const express = require('express')
const api = express.Router()

const AlbumController = require('../controllers/AlbumController')
const ArtistController = require('../controllers/ArtistController')
const ManagerController = require('../controllers/ManagerController')
const PlaylistController = require('../controllers/PlaylistController')
const ReportController = require('../controllers/ReportController')
const SongController = require('../controllers/SongController')
const StreamController = require('../controllers/StreamController')
const UserController = require('../controllers/UserController')

api.get('/', (request, response) => {
    console.log('llega')
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


//User
api.post('/user/login/', UserController.loginUser)
api.post('/user/register/', UserController.registerUser)
api.put('/user/sub/', UserController.updateUserSub)

//Manager
api.post('/manager/', ManagerController.postManager)
api.post('/user/probeM/', ManagerController.probeManager)

//Album
api.get('/album/', AlbumController.getAlbum)
api.put('/album/', AlbumController.modifyAlbum)
api.delete('/album/', AlbumController.deleteAlbum)

//Artista
api.get('/artist/', ArtistController.getArtist)
api.post('/artist/', ArtistController.postArtist)
api.put('/artist/', ArtistController.modifyArtist)
api.delete('/artist/', ArtistController.deleteArtist)
api.post('/user/probe/', ArtistController.probeArtist)

//Cancion
api.get('/cancion/', SongController.getSongs)
api.put('/cancion/inab/', SongController.inabCanciones)
api.put('/cancion/', SongController.modifyCancion)
api.post('/cancion/del', SongController.deleteCancion)

//Playlist
api.post('/playlist/get/', PlaylistController.getPlaylists)
api.post('/playlist/', PlaylistController.postPlaylist)
api.get('/contiene/', PlaylistController.getSongsIntoPlaylist)
api.post('/contiene/', PlaylistController.postSongIntoPlaylist)

//Stream
api.post('/stream/', StreamController.postStream)
api.get('/user/streams/', StreamController.getDayStreamsPerUser)

//Report
api.get('/report/1', ReportController.getReport1)
api.get('/report/2', ReportController.getReport2)
api.get('/report/3', ReportController.getReport3)
api.get('/report/4', ReportController.getReport4)
api.get('/report/5', ReportController.getReport5)
api.get('/report/6', ReportController.getReport6)


module.exports = api
