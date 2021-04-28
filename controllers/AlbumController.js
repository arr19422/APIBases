'use strict'

const config = require('../config')

function getAlbum(req, res) {
    config.pool.query('select id_album,nombrealbum, fecha from Album',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function modifyAlbum(req, res) {
    const { id_album, nombrealbum, fecha } = req.body
    config.pool.query('UPDATE Album SET nombrealbum = $1, fecha = $2 WHERE id_album = $3',
        [nombrealbum, fecha, parseInt(id_album)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Album Modificado! ID: ${results.rows}`)
        })
}

function deleteAlbum(req, res) {
    const { id_album } = req.body
    config.pool.query('DELETE FROM Album WHERE id_album = $3',
        [parseInt(id_album)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Album Eliminado! ID: ${id_album}`)
        })
}

function getSearchAlbum(req, res) {
    const { nombre } = req.body
    config.pool.query("select id_cancion, nombre, duracion, a2.nombre_artista as artista ,a3.nombrealbum as album from cancion inner join artista a2 on cancion.id_artista = a2.id_artista inner join album a3 on a3.id_album = cancion.id_album where a3.nombrealbum = $1 group by cancion.id_cancion,cancion.nombre, cancion.duracion, artista, nombrealbum, cancion, cancion.activo having cancion.activo = 'Si'", [nombre],(err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    getAlbum,
    modifyAlbum,
    deleteAlbum,
    getSearchAlbum,
}