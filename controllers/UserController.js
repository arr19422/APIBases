'use strict'

const config = require('../config')

function loginUser(req, res) {
    const { nombre, contrasena } = req.body
    config.pool.query("SELECT * FROM Usuario WHERE nombre = $1 and contrasena = $2 and activo = 'Si'",
        [nombre, contrasena], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getUsers(req, res) {
    config.pool.query('SELECT id_usuario,nombre FROM Usuario', (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getUsersNoMonitors(req, res) {
    config.pool.query('SELECT id_usuario,nombre FROM Usuario u where u.id_usuario not in (select m.id_usuario from asignar_monitor m)', (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getUsersWithoutSub(req, res) {
    config.pool.query("SELECT id_usuario,nombre FROM Usuario WHERE fecha_suscripcion is NULL", (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getUsersWithSub(req, res) {
    config.pool.query("SELECT id_usuario,nombre FROM Usuario WHERE fecha_suscripcion is not NULL", (err, results) => {
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

function deleteUserSub(req, res) {
    const { id_usuario } = req.body
    config.pool.query("UPDATE Usuario SET premium = 'No' WHERE id_usuario = $1",
        [id_usuario], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Usuario Desuscrito! ID: ${results.rows}`)
        })
}

function updateUserStatus(req, res) {
    const { id_usuario } = req.body
    config.pool.query("UPDATE Usuario SET activo = 'No' WHERE id_usuario = $1",
        [id_usuario], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Usuario Inactivado! ID: ${results.rows}`)
        })
}

module.exports = {
    loginUser,
    registerUser,
    updateUserSub,
    getUsers,
    getUsersWithoutSub,
    getUsersWithSub,
    deleteUserSub,
    updateUserStatus,
    getUsersNoMonitors
}
