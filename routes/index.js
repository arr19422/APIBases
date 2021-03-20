// 'use strict'

const express = require('express')
const api = express.Router()

// const UserController = require('../controllers/User')
// const PublicationController = require('../controllers/Publication')
// const NotificationController = require('../controllers/Notification');
// const AuthController = require('../controllers/auth')
// const Auth = require('../middlewares/auth')
// const multipart = require('connect-multiparty');

// const md_uploadUser = multipart({uploadDir: './uploads/users'});
// const md_uploadPublication = multipart({uploadDir: './uploads/publications'});

// //Privado
// api.get('/private', Auth, (req, res) => {
//     res.status(200).send(true)
// })

// //User.
// api.get('/user', UserController.getUsers)

// api.get('/user/:userId', UserController.getUser)

// api.get('/Albums/mas-recientes', UserController.getUserByName)

// api.post('/user/signUp', AuthController.signUp)

// api.post('/user/signIn', AuthController.signIn)

// api.put('/user/:userId', UserController.updateUser)

// api.delete('/user/:userId', UserController.deleteUser)

// api.post('/ImageUser/:userId', md_uploadUser, UserController.uploadImage);

// api.get('/ImageUser/:imageFile', UserController.getImageFile);

// //Publication
// api.get('/publication', PublicationController.getPublications)

// api.get('/publication/id/:publicationId', PublicationController.getPublication)

// api.get('/publication/user/:userId', PublicationController.getPublicationsByUser)

// api.post('/publication', PublicationController.createPublication)

// api.put('/publication/:publicationId', PublicationController.updatePublication)

// api.put('/publication/like/:publicationId', PublicationController.updatePublicationLike)

// api.put('/publication/comment/:publicationId', PublicationController.updatePublicationComment)

// api.delete('/publication/:publicationId', PublicationController.deletePublication)

// api.post('/ImagePublication/:publicationId', md_uploadPublication, PublicationController.uploadImage);

// api.get('/ImagePublication/:imageFile', PublicationController.getImageFile);

// //Notification methods.
// api.post('/notification', NotificationController.createNotification);

// api.get('/notification/:notificationId', NotificationController.getNotification);

module.exports = api