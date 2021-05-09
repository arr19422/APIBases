'use strict'

const config = require('../config')

function getArtist(req, res) {
    config.pool.query('select id_artista, nombre_artista, fans, descripcion, id_manager, id_usuario from artista a ',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function postArtist(req, res) {
    const { id_usuario, fans, nombre_artista, id_manager, descripcion } = req.body
    config.pool.query('INSERT INTO Artista (nombre_artista, fans, descripcion, id_manager, id_usuario) VALUES ($1, $2, $3, $4, $5)',
        [nombre_artista, fans, descripcion, parseInt(id_manager), parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Artista Inscrito! ID: ${results.rows}`)
        })
}

function modifyArtist(req, res) {
    const { nombre_artista, descripcion, fans, id_artista,} = req.body
    config.pool.query('UPDATE Artista SET nombre_artista = $1, descripcion = $2, fans = $3 WHERE id_artista = $4',
        [nombre_artista, descripcion, fans, parseInt(id_artista)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Artista Modificado! ID: ${results.rows}`)
        })
}

function probeArtist(req,res){
    const { id_usuario } = req.body
    config.pool.query('select u.id_usuario, a.id_artista from usuario u inner join artista a on u.id_usuario= $1 and u.id_usuario =a.id_usuario ',
        [parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getSearchArtist(req, res) {
    const { nombre } = req.body
    config.pool.query("select id_cancion, nombre, duracion, a2.nombre_artista as artista ,a3.nombrealbum as album from cancion inner join artista a2 on cancion.id_artista = a2.id_artista inner join album a3 on a3.id_album = cancion.id_album where a2.nombre_artista = $1 group by cancion.id_cancion,cancion.nombre, cancion.duracion, artista, nombrealbum, cancion, cancion.activo having cancion.activo = 'Si'", [nombre],(err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getComisionArtist(req, res) {
    const { id_usuario } = req.body
    config.pool.query("select nombre_artista, count(nombre_artista), (count(nombre_artista)*0.2) as comision from artista a2 inner join cancion c on a2.id_artista = c.id_artista inner join escucha e on e.id_cancion = c.id_cancion where a2.id_usuario = $1 group by a2.nombre_artista", [id_usuario],(err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    getArtist,
    postArtist,
    modifyArtist,
    deleteArtist,
    probeArtist,
    getSearchArtist,
    deleteArtistSub,
    getComisionArtist
}
