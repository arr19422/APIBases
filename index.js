const app = require('./app')
const config = require('./config')
const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("Conexion a la base de Datos Establecida")

app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
})

async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  run().catch(console.dir);

  module.exports = client
