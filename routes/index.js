// 'use strict'

const express = require('express')
const api = express.Router()

const UserController = require('../controllers/User')

api.get('/', (request, response) => {
    console.log('llega')
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


//User
api.get('/user/login/', UserController.loginUser)
api.post('/user/register/', UserController.registerUser)
api.get('/user/streams/', UserController.getDayStreamsPerUser)
api.put('/user/sub/', UserController.updateUserSub)
api.post('/user/artist/', UserController.postArtist)

module.exports = api