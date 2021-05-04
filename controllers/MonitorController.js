'use strict'

const config = require('../config')

function postMonitor(req, res) {
    config.pool.query('INSERT into MonitorType (id_tipo, tipo) VALUES ($1, $2, $3, $4, $5)',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}


function setMonitor(req, res) {
    config.pool.query('INSERT into Monitor (id_usuario, id_tipo) VALUES ($1, $2, $3, $4, $5)',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    postMonitor,
    setMonitor,
}