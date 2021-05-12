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
const GenreController = require('../controllers/GenreController')
const MonitorController = require('../controllers/MonitorController')

api.get('/', (request, response) => {
    console.log('llega')
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


//User
api.post('/user/login/', UserController.loginUser)
api.post('/user/register/', UserController.registerUser)
api.put('/user/sub/', UserController.updateUserSub)
api.get('/user/getAllUsers/', UserController.getUsers)
api.get('/user/withoutSub',UserController.getUsersWithoutSub)
api.get('/user/withSub',UserController.getUsersWithSub)
api.post('/user/deleteSub',UserController.deleteUserSub)
api.put('/user/updateStatus',UserController.updateUserStatus)
api.get('/user/getAllUsersNoMonitors/', UserController.getUsersNoMonitors)
api.post('/user/updateLogin',UserController.updateUserLogin)
api.post('/user/updateLoginOut',UserController.updateUserLoginOut)

//Manager
api.post('/manager/', ManagerController.postManager)
api.post('/user/probeM/', ManagerController.probeManager)

//Album
api.get('/album/', AlbumController.getAlbum)
api.put('/album/inab/', AlbumController.inabAlbum)
api.post('/album/post', AlbumController.postAlbum)
api.put('/album/', AlbumController.modifyAlbum)
api.post('/album/', AlbumController.deleteAlbum)
api.post('/album/getalbum', AlbumController.getSearchAlbum)


//Artista
api.get('/artist/', ArtistController.getArtist)
api.post('/artist/', ArtistController.postArtist)
api.put('/artist/', ArtistController.modifyArtist)
api.post('/artist/del/', ArtistController.deleteArtistSub)
api.post('/user/probe/', ArtistController.probeArtist)
api.post('/artist/getartist',ArtistController.getSearchArtist)
api.post('/artist/getComision',ArtistController.getComisionArtist)


//Cancion
api.get('/cancion/', SongController.getSongs)
api.put('/cancion/inab/', SongController.inabCanciones)
api.post('/cancion/post', SongController.postSong)
api.put('/cancion/', SongController.modifyCancion)
api.post('/cancion/del', SongController.deleteCancion)
api.post('/cancion/link', SongController.getLinkSongs)
api.post('/cancion/getsong', SongController.getSearchSong)

//Playlist
api.post('/playlist/get/', PlaylistController.getPlaylists)
api.post('/playlist/', PlaylistController.postPlaylist)
api.post('/contiene/songs', PlaylistController.getSongsIntoPlaylist)
api.post('/playlist/contiene/', PlaylistController.postSongIntoPlaylist)
api.post('/playlist/get/search', PlaylistController.getSearchSongInPlaylist)


//Stream
api.post('/stream/', StreamController.postStream)
api.get('/user/streams/', StreamController.getDayStreamsPerUser)

//Genre
api.post('/genero/name', GenreController.getSearchGenre)

//Report
api.get('/report/1', ReportController.getReport1)
api.get('/report/2', ReportController.getReport2)
api.get('/report/3', ReportController.getReport3)
api.get('/report/4', ReportController.getReport4)
api.get('/report/5', ReportController.getReport5)
api.get('/report/6', ReportController.getReport6)
api.get('/report/7', ReportController.getReport7)
api.get('/report/8', ReportController.getReport8)
api.get('/report/9', ReportController.getReport9)
api.get('/report/10', ReportController.getReport10)

api.post('/postReport/7', ReportController.postReport7)
api.post('/postReport/8', ReportController.postReport8)
api.post('/postReport/9', ReportController.postReport9)
api.post('/postReport/10', ReportController.postReport10)

//Monitor
api.post('/monitor/crear', MonitorController.postMonitor)
api.post('/monitor/asignar', MonitorController.asignMonitor)
api.get('/monitores/', MonitorController.getMonitors)
api.post('/monitores/probeMonitor', MonitorController.probeMonitor)
api.post('/monitores/getOptionsMonitor',MonitorController.getOptionsMonitor)
api.get('/monitores/user', MonitorController.getMonitorsByUser)
api.get('/monitores/bitacora',MonitorController.getBitacora)

module.exports = api
