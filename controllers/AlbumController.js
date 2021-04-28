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

module.exports = {
    getAlbum,
    modifyAlbum,
    deleteAlbum,
}