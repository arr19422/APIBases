const app = require('./app')
const config = require('./config')
    
    console.log("Conexion a la base de Datos Establecida")
    
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })


