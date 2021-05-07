'use strict'

const config = require('../config')

function getReport1(req, res) {
    config.pool.query("select * from album a where fecha between '2021-03-22' and '2021-03-28'",
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

function getReport2(req, res) {
    config.pool.query("select a5.nombre_artista , count1 as Marzo, count2 as Febrero, count3 as Enero, (count1-count2-count3) as Diferencia_Escucha from artista a5, (select a2.nombre_artista as artista1, count(a2.*) as count1, e2.fecha from artista a2 inner join cancion c2 on a2.id_artista = c2.id_artista inner join escucha e2 on c2.id_cancion = e2.id_cancion group by a2.nombre_artista, e2.fecha having e2.fecha between '2021-03-01' and '2021-03-31') as foo,(select a3.nombre_artista as artista2, count(a3.*) as count2, e3.fecha from artista a3 inner join cancion c3 on a3.id_artista = c3.id_artista inner join escucha e3 on c3.id_cancion = e3.id_cancion group by a3.nombre_artista, e3.fecha having e3.fecha between '2021-02-01' and '2021-02-28') as foo2,(select a4.nombre_artista as artista3, count(a4.*) as count3, e4.fecha from artista a4 inner join cancion c4 on a4.id_artista = c4.id_artista inner join escucha e4 on c4.id_cancion = e4.id_cancion group by a4.nombre_artista, e4.fecha having e4.fecha between '2021-01-01' and '2021-01-31') as foo3 group by a5.nombre_artista , count3, count2, count1 order by Diferencia_Escucha desc limit 10",
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
    config.pool.query('select u.nombre, sum(c.duracion) as suma from usuario u inner join escucha e2 on e2.id_usuario = u.id_usuario inner join cancion c on c.id_cancion = e2.id_cancion group by u.nombre order by sum(c.duracion) desc limit 5',
        [], (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).json(results.rows)
        })
}

module.exports = {
    getReport1,
    getReport2,
    getReport3,
    getReport4,
    getReport5,
    getReport6,
}
