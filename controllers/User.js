'use strict'

const config = require('../config')

function loginUser(req, res) {
    const {nombre, contrasena} = req.body
    console.log(nombre)
    console.log(contrasena)
    config.pool.query('SELECT * FROM Usuario WHERE nombre = $1 and contrasena = $2', [nombre, contrasena], (err, results) => {
        if(err) {
            throw err
        }
          res.status(200).json(results.rows)
    })
}

function registerUser(req, res) {
    const {nombre, contrasena, edad, pais, premium, administrador} = req.body
    config.pool.query('INSERT INTO Usuario VALUES ($1, $2, $3, $4, $5, $6)', [nombre, pais, edad, premium, administrador, contrasena], (err, results) => {
        if(err) {
            throw err
        }
          res.status(201).json(`Usuario Agregado con ID ${results.id_usuario}`)
    })
}

function getDayStreamsPerUser(req, res) {
    const {id} = req.body
    console.log(id)
    config.pool.query('SELECT count(*) FROM Escucha e INNER JOIN Usuario u on e.id_usuario = $1', [parseInt(id)], (err, results) => {
        if(err) {
            throw err
        }
          res.status(200).json(results.rows)
    })
}

function updateUserSub(req, res) {
    const {id} = req.body
    console.log(id)
    config.pool.query('UPDATE Usuario SET premium = "Si" WHERE id_usuario = $1', [parseInt(id)], (err, results) => {
        if(err) {
            throw err
        }
          res.status(200).json(`Usuario Suscrito! ID: ${results.id_usuario}`)
    })
}

function postArtist(req, res) {
    const {idUsuario, nombreArtista, descripcion} = req.body
    console.log(id)
    config.pool.query('INSERT INTO Artista VALUES ($1, 0, $2, NULL, $3)', [nombreArtista, descripcion, parseInt(idUsuario)], (err, results) => {
        if(err) {
            throw err
        }
          res.status(200).json(`Usuario Suscrito! ID: ${results.id_usuario}`)
    })
}

module.exports = {
    loginUser,
    registerUser,
    getDayStreamsPerUser,
    updateUserSub,
    postArtist
}