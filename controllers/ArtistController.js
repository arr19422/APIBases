'use strict'

const config = require('../config')

function getArtist(req, res) {
    config.pool.query('select id_artista,nombre_artista, fans, descripcion from Artista',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
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

function modifyArtist(req, res) {
    const { nombre_artista, descripcion, fans, id_artista,} = req.body
    config.pool.query('UPDATE Artista SET nombre_artista = $1, descripcion = $2, fans = $3 WHERE id_artista = $4',
        [nombre_artista, descripcion, fans, parseInt(id_artista)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Artista Modificado! ID: ${results.rows}`)
        })
}

function deleteArtist(req, res) {
    const { id_artista } = req.body
    config.pool.query('DELETE FROM Artista WHERE id_artista = $1',
        [parseInt(id_artista)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Artista Eliminado! ID: ${id_artista}`)
        })
}

function probeArtist(req,res){
    const { id_usuario } = req.body
    config.pool.query('select u.id_usuario from usuario u inner join artista a on u.id_usuario= $1 and u.id_usuario =a.id_usuario ',
        [id_usuario], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    getArtist,
    postArtist,
    modifyArtist,
    deleteArtist,
    probeArtist,
}