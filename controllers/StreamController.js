'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

function postStreamDocument(req, res) {
    config.pool.query('SELECT c.nombre, g.descripcion, a.nombre_artista, u.nombre as usuario, e.fecha FROM Escucha e inner join cancion c on e.id_cancion = c.id_cancion inner join genero g on c.id_genero = g.id_genero inner join artista a on c.id_artista = a.id_artista inner join usuario u ON e.id_usuario = u.id_usuario',
        [], async (err, results) => {
            if (err) {
                throw err
            }
            await client.connect()
            const db = client.db("musicorum")
            const collection = db.collection("streams")
            collection.deleteMany({})
            const result = await collection.insertMany(results.rows)
            console.log(result);
            res.status(200).json(results.rows)
            client.close()  
            })    
}

async function getRecommendations(req, res) {
    await client.connect()
    const db = client.db("musicorum")
    const collection = db.collection("streams")
    const agg = [
        {
          $group: {
            _id: '$nombre', 
            count: {
              $sum: 1
            }
          }
        }
    ]
    const sort = { count: -1 }
    var cursor = collection.aggregate(agg).sort(sort).limit(3)
    await cursor.toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.status(200).json(result);
        client.close()  
    })
       
}

module.exports = {
    postStream,
    getDayStreamsPerUser,
    postStreamDocument,
    getRecommendations,
}
