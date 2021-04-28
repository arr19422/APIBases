'use strict'

const config = require('../config')

function postStream(req, res) {
    const { id_cancion, id_usuario, fecha } = req.body
    config.pool.query('INSERT INTO Escucha VALUES ($1, $2, $3)',
        [parseInt(id_cancion), parseInt(id_usuario), fecha], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getDayStreamsPerUser(req, res) {
    const { id_usuario, fecha } = req.body
    config.pool.query('SELECT count(*) FROM Escucha e INNER JOIN Usuario u on e.id_usuario = u.id_usuario and e.fecha = $2 where u.id_usuario=$1',
        [parseInt(id_usuario), fecha], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    postStream,
    getDayStreamsPerUser,
}