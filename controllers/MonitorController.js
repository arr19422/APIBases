'use strict'

const config = require('../config')

function postMonitor(req, res) {
    const { tipo, opciones } = req.body
    config.pool.query('INSERT into monitor (tipo, opciones) VALUES ($1, $2, $3, $4, $5)',
        [tipo, opciones], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}


function asignMonitor(req, res) {
    const { id_usuario, tipo } = req.body
    config.pool.query('INSERT into asignar_monitor (id_usuario, tipo) VALUES ($1, $2)',
        [id_usuario, tipo], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    postMonitor,
    asignMonitor,
}