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

function getDayStreamsPerUser(req, res) {
    const { id_usuario, fecha } = req.body
    config.pool.query('SELECT count(*) FROM Escucha e INNER JOIN Usuario u on e.id_usuario = $1 and fecha = $2',
        [parseInt(id_usuario), fecha], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getSongs(req, res) {
    config.pool.query("select nombre, duracion, a2.nombre_artista as artista ,a3.nombrealbum as album from cancion inner join artista a2 on cancion.id_artista = a2.id_artista inner join album a3 on a3.id_album = cancion.id_album group by cancion.nombre, cancion.duracion, artista, nombrealbum, cancion, cancion.activo having cancion.activo = 'Si'",(err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getPlaylists(req, res) {
    const { id_usuario } = req.body
    config.pool.query('select nombre,fecha from playlist p2 where id_usuario = $1 ',[parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

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

function getArtist(req, res) {
    config.pool.query('select nombre_artista, fans, descripcion from Artista',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getAlbum(req, res) {
    config.pool.query('select nombrealbum, fecha from Album',
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

function inabCanciones(req, res) {
    const { id_cancion } = req.body
    config.pool.query('UPDATE Cancion SET activo = "No" WHERE id_cancion = $1',
        [parseInt(id_cancion)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Inabilitada! ID: ${results.rows}`)
        })
}

function modifyArtist(req, res) {
    const { id_artista, nombre_artista, descripcion, id_manager } = req.body
    config.pool.query('UPDATE Artista SET nombre_artista = $1, descripcion = $2, id_manager = $3 WHERE id_artista = $4',
        [nombre_artista, descripcion, parseInt(id_manager), parseInt(id_artista)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Artista Modificado! ID: ${results.rows}`)
        })
}

function modifyAlbum(req, res) {
    const { id_album, nombrealbum, fecha } = req.body
    config.pool.query('UPDATE Album SET nombrealbum = $1, fecha = $2 WHERE id_album = $3',
        [nombrealbum, fecha, parseInt(id_album)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Album Modificado! ID: ${results.rows}`)
        })
}

function modifyCancion(req, res) {
    const { id_cancion, duracion, nombre, id_genero } = req.body
    config.pool.query('UPDATE Cancion SET duracion = $1, nombre = $2, id_genero = $3 WHERE id_cancion = $4',
        [parseFloat(duracion), nombre, parseInt(id_genero), parseInt(id_cancion)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Modificada! ID: ${results.rows}`)
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

function deleteAlbum(req, res) {
    const { id_album } = req.body
    config.pool.query('DELETE FROM Album WHERE id_album = $3',
        [parseInt(id_album)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Album Eliminado! ID: ${id_album}`)
        })
}

function deleteCancion(req, res) {
    const { id_cancion } = req.body
    config.pool.query('DELETE FROM Cancion WHERE id_cancion = $4',
        [parseInt(id_cancion)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Eliminada! ID: ${id_cancion}`)
        })
}

function postPlaylist(req, res) {
    const { id_usuario, nombre, fecha } = req.body
    config.pool.query('INSERT INTO Playlist (nombre, fecha, id_usuario) VALUES ($1, $2, $3)',
        [nombre, fecha, parseInt(id_usuario)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Insersion a la Playlist Hecha!`)
        })
}

function getSongsIntoPlaylist(req, res) {
    const { id_playlist } = req.body
    config.pool.query('SELECT * from Cancion ca INNER JOIN Contiene c on c.id_playlist = $1 and c.id_cancion = ca.id_cancion ',
        [parseInt(id_playlist)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function postSongIntoPlaylist(req, res) {
    const { id_cancion, id_playlist } = req.body
    config.pool.query('INSERT INTO Contiene (id_cancion, id_playlist) VALUES ($1, $2)',
        [parseInt(id_cancion), parseInt(id_playlist)], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(`Cancion Agregada!`)
        })
}

function getReport1(req, res) {
    config.pool.query("select * from album a where fecha between '2021-03-22' and '2021-03-28'",
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getReport3(req, res) {
    config.pool.query("select count(*) as cantidad, extract(year from u2.fecha_suscripcion ) as año, extract(month from u2.fecha_suscripcion ) as mes from usuario u2 where premium = 'Si' group by año, mes order by año asc limit 6;",
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getReport4(req, res) {
    config.pool.query('select a.nombre_artista, count(*) as cantidad_de_canciones from artista a inner join cancion c on a.id_artista = c.id_artista group by a.nombre_artista order by count(*) desc',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getReport5(req, res) {
    config.pool.query('select g.descripcion , count(*) cantidad_escuchada from escucha e inner join cancion c on e.id_cancion = c.id_cancion inner join genero g on c.id_genero = g.id_genero group by g.descripcion order by count(*) desc',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getReport6(req, res) {
    config.pool.query('select u.nombre, sum(c.duracion) from usuario u inner join escucha e2 on e2.id_usuario = u.id_usuario inner join cancion c on c.id_cancion = e2.id_cancion group by u.nombre order by sum(c.duracion) desc limit 5',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
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
    loginUser,
    registerUser,
    getDayStreamsPerUser,
    postStream,
    updateUserSub,
    postArtist,
    postManager,
    inabCanciones,
    modifyAlbum,
    modifyArtist,
    modifyCancion,
    deleteArtist,
    deleteAlbum,
    deleteCancion,
    postPlaylist,
    postSongIntoPlaylist,
    getReport1,
    getReport3,
    getReport4,
    getReport5,
    getReport6,
    getSongs,
    getPlaylists,
    getSongsIntoPlaylist,
    getArtist,
    getAlbum,
    probeArtist,
    probeManager

}