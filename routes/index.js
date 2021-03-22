// 'use strict'

const express = require('express')
const api = express.Router()

const UserController = require('../controllers/User')

api.get('/', (request, response) => {
    console.log('llega')
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


//User
api.get('/user', UserController.getUser)

module.exports = api