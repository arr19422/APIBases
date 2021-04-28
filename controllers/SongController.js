'use strict'

const config = require('../config')

function getSongs(req, res) {
    config.pool.query("select nombre, duracion, a2.nombre_artista as artista ,a3.nombrealbum as album from cancion inner join artista a2 on cancion.id_artista = a2.id_artista inner join album a3 on a3.id_album = cancion.id_album group by cancion.nombre, cancion.duracion, artista, nombrealbum, cancion, cancion.activo having cancion.activo = 'Si'",(err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function inabCanciones(req, res) {
    const { id_cancion } = req.body
    config.pool.query('UPDATE Cancion SET activo = "No" WHERE id_cancion = $1',
        [parseInt(id_cancion)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Inabilitada! ID: ${results.rows}`)
        })
}

function modifyCancion(req, res) {
    const { id_cancion, duracion, nombre, id_genero } = req.body
    config.pool.query('UPDATE Cancion SET duracion = $1, nombre = $2, id_genero = $3 WHERE id_cancion = $4',
        [parseFloat(duracion), nombre, parseInt(id_genero), parseInt(id_cancion)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Modificada! ID: ${results.rows}`)
        })
}

function deleteCancion(req, res) {
    const { id_cancion } = req.body
    console.log('HEEEEY',id_cancion)
    config.pool.query('DELETE FROM Cancion WHERE id_cancion = $1',
        [id_cancion], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Eliminada! ID: ${id_cancion}`)
        })
}

function getLinkSongs(req, res) {
    const { id_cancion } = req.body
    config.pool.query('select link from cancion where id_cancion = $1 ',[parseInt(id_cancion)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getSearchSong(req, res) {
    const { nombre } = req.body
    config.pool.query("select id_cancion, nombre, duracion, a2.nombre_artista as artista ,a3.nombrealbum as album from cancion inner join artista a2 on cancion.id_artista = a2.id_artista inner join album a3 on a3.id_album = cancion.id_album where nombre=$1 group by cancion.id_cancion,cancion.nombre, cancion.duracion, artista, nombrealbum, cancion, cancion.activo having cancion.activo = 'Si'", [nombre],(err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    getSongs,
    inabCanciones,
    modifyCancion,
    deleteCancion,
    getLinkSongs,
    getSearchSong,
}