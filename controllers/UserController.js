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

function updateUserSub(req, res) {
    const { id_usuario, fecha_suscripcion } = req.body
    config.pool.query("UPDATE Usuario SET premium = 'Si', fecha_suscripcion = $1 WHERE id_usuario = $2",
        [fecha_suscripcion, parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Usuario Suscrito! ID: ${results.rows}`)
        })
}

module.exports = {
    loginUser,
    registerUser,
    updateUserSub,
}