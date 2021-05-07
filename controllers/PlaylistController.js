'use strict'

const config = require('../config')

function getPlaylists(req, res) {
    const { id_usuario } = req.body
    config.pool.query('select id_playlist,nombre,fecha from playlist p2 where id_usuario = $1 ',[parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function postPlaylist(req, res) {
    const { id_usuario, nombre, fecha } = req.body
    config.pool.query('INSERT INTO Playlist (nombre, fecha, id_usuario) VALUES ($1, $2, $3)',
        [nombre, fecha, parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Insersion a la Playlist Hecha!`)
        })
}

function getSongsIntoPlaylist(req, res) {
    const { id_playlist } = req.body
    config.pool.query('SELECT * from Cancion ca INNER JOIN Contiene c on c.id_playlist = $1 and c.id_cancion = ca.id_cancion ',
        [parseInt(id_playlist)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function postSongIntoPlaylist(req, res) {
    const { id_cancion, id_playlist } = req.body
    config.pool.query('INSERT INTO Contiene (id_cancion, id_playlist) VALUES ($1, $2)',
        [parseInt(id_cancion), parseInt(id_playlist)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Agregada!`)
        })
}

function getSearchSongInPlaylist(req, res) {
    const { id_playlist } = req.body
    config.pool.query("select cancion.id_cancion, nombre, duracion, a2.nombre_artista as artista ,a3.nombrealbum as album from cancion inner join artista a2 on cancion.id_artista = a2.id_artista inner join album a3 on a3.id_album = cancion.id_album inner join contiene c2 on c2.id_cancion = cancion.id_cancion where c2.id_playlist=$1 group by cancion.id_cancion,cancion.nombre, cancion.duracion, artista, nombrealbum, cancion, cancion.activo having cancion.activo = 'Si'", [id_playlist],(err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    getPlaylists,
    postPlaylist,
    getSongsIntoPlaylist,
    postSongIntoPlaylist,
    getSearchSongInPlaylist,
}
