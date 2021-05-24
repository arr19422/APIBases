const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ajacdwpsyiilrc',
  host: 'ec2-18-207-95-219.compute-1.amazonaws.com',
  database: 'dejbi3fp09mp08',
  password: 'b0a74b66c12181de2a5e42bd26c3a84044c320779af55b4b3bef73dc3f97944e',
  port: 5432,
  ssl: true,
})

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const uri = "mongodb+srv://admin:admin@musicorum.w4ras.mongodb.net/Musicorum?retryWrites=true&w=majority";

module.exports = {
  port: process.env.PORT || 3000,
  pool: pool,
  uri: uri
}