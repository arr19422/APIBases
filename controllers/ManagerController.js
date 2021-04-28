'use strict'

const config = require('../config')

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

function probeManager(req,res){
    const { id_usuario } = req.body
    config.pool.query('select u.id_usuario from usuario u inner join manager m2 on u.id_usuario= $1 and u.id_usuario =m2.id_usuario ',
        [id_usuario], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    postManager,
    probeManager,
}