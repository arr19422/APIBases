'use strict'

const config = require('../config')

function loginUser(req, res) {
    const { nombre, contrasena } = req.body
    config.pool.query('SELECT * FROM Usuario WHERE nombre = $1 and contrasena = $2',
        [nombre, contrasena], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function registerUser(req, res) {
    const { nombre, contrasena, edad, pais, premium, administrador } = req.body
    config.pool.query(`INSERT INTO usuario (nombre, pais, edad, premium, contrasena, administrador) VALUES ($1, $2, $3, $4, $5, $6)`,
        [nombre, pais, parseInt(edad), premium, contrasena, administrador], (err, results) => {
            if (err) {
                throw err
            }
            console.log(results);
            res.status(201).json(`Usuario Agregado`)
        })
}

function getDayStreamsPerUser(req, res) {
    const { id_usuario } = req.body
    config.pool.query('SELECT count(*) FROM Escucha e INNER JOIN Usuario u on e.id_usuario = $1',
        [parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function updateUserSub(req, res) {
    const { id_usuario } = req.body
    config.pool.query('UPDATE Usuario SET premium = "Si" WHERE id_usuario = $1',
        [parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Usuario Suscrito! ID: ${results.rows}`)
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

function postManager(req, res) {
    const { id_usuario, telefono } = req.body
    config.pool.query('INSERT INTO Manager (telefono, id_usuario) VALUES ($1, $2)',
        [telefono, parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Manager Inscrito! ID: ${results.rows}`)
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

function modifyArtist(req, res) {
    const { id_artista, nombre_artista, descripcion, id_manager } = req.body
    config.pool.query('UPDATE Artista SET nombre_artista = $1, descripcion = $2, id_manager = $3 WHERE id_artista = $4',
        [nombre_artista, descripcion, parseInt(id_manager), parseInt(id_artista)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Artista Modificado! ID: ${results.rows}`)
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

module.exports = {
    loginUser,
    registerUser,
    getDayStreamsPerUser,
    updateUserSub,
    postArtist,
    postManager,
    inabCanciones,
    modifyAlbum,
    modifyArtist,
    modifyCancion
}