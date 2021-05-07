'use strict'

const config = require('../config')

function postMonitor(req, res) {
    const { tipo, opciones } = req.body
    console.log(tipo)
    console.log(opciones)
    config.pool.query('INSERT into monitor (tipo, opciones) VALUES ($1, $2)',
        [tipo, opciones], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Monitor Agregado! ID: ${results.rows}`)
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

function getMonitors(req, res) {
    config.pool.query('SELECT * from monitor',
         (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function probeMonitor(req,res){
    const { id_usuario } = req.body
    config.pool.query('select u.id_usuario from usuario u inner join asignar_monitor a on u.id_usuario= $1 and u.id_usuario =a.id_usuario ',
        [id_usuario], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getOptionsMonitor(req,res){
    const { id_usuario } = req.body
    config.pool.query('select m.opciones from usuario u inner join asignar_monitor a on u.id_usuario= $1 and u.id_usuario =a.id_usuario inner join monitor m on m.tipo = a.tipo ',
        [id_usuario], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}



module.exports = {
    postMonitor,
    asignMonitor,
    getMonitors,
    probeMonitor,
    getOptionsMonitor
}