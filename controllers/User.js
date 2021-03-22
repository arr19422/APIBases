'use strict'

const config = require('../config')

function getUser(req, res) {
    const nombre = req.body.nombre
    const contrasena = req.body.contrasena
    console.log(nombre)
    console.log(contrasena)
    config.pool.query('SELECT * FROM Usuario WHERE nombre = $1 and contrasena = $2', [nombre, contrasena], (err, results) => {
        if(err) {
            throw err
        }
          res.status(200).json(results.rows)
    })
}


module.exports = {
    getUser
}