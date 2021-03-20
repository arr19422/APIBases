// 'use strict'

// const User = require('../Models/User')
// var fs = require('fs');
// var path = require('path');


// function getUsers(req, res) {
//     User.find({}, (err, users) => {
//         if (err) return res.status(200).send({ message: `Error al obtener datos: ${err}` })
//         if (!users) return res.status(404).send({ message: "No existen users" })

//         res.status(200).send((users))
//     })
// }

// function getUser(req, res) {
//     let userId = req.params.userId

//     User.findById(userId, (err, user) => {
//         if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
//         if (!user) return res.status(404).send({ message: "El prodcuto no Existe" })

//         res.status(200).send((JSON.stringify(user)))
//     })
// }

// function getUserByName(req, res) {
//     let username = req.params.username
//     User.findOne({ UserName: username }, (err, user) => {
//         if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
//         if (!user) return res.status(200).send(false)

//         res.status(200).send(true)
//     })
// }

// function updateUser(req, res) {
//     let userId = req.params.userId
//     const body = (req.body)
//     const update = JSON.parse(body)

//     User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
//         if (err) return res.status(500).send({ message: `Error al actualizar User: ${err}` })

//         res.status(200).send({ message: "User Actualizado" })
//     })
// }


// function deleteUser(req, res) {
//     let userId = req.params.userId

//     User.findById(userId, (err, user) => {
//         if (err) return res.status(500).send({ message: `Error al borrar user: ${err}` })

//         user.remove(err => {
//             if (err) return res.status(500).send({ message: `Error al borrar user: ${err}` })
//             res.status(200).send({ message: `El prodcuto con ID ${userId} ha sido eliminado` })
//         })
//     })
// }

// function uploadImage(req, res){
//     var userId = req.params.userId;
//      if(req.files){
//          var file_path = req.files.image.path;

//          var file_split = file_path.split('/');

//          var file_name = file_split[2];

//          var ext_xplit = file_name.split('\.');

//          var file_ext = ext_xplit[1];

//          if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
//             //Actualizar documento de usuario logueado
//             User.findByIdAndUpdate(userId, {Photo: file_name}, {new:true}, (err, userUpdated) =>{
//                 if(err) return res.status(500).send({message: 'Error en la peticion'});
//                 if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
//                 return res.status(200).send({user: userUpdated});
//             })           
//          }else{
//             return removefileOfUploads(res, file_path, 'Extension no valida');
//          }
//      } else {
//          return res.status(200).send({message: 'no se han subido imagenes imagenes'});
//      }
     

//  }

// function removefileOfUploads(res, file_path, message){
//     fs.unlink(file_path, (err) =>{
//        return res.status(200).send({message: message});
//     });
//  }

//  function getImageFile(req, res){
//     var image_file = req.params.imageFile;
//     var path_file = "./uploads/users/" + image_file;
//     fs.exists(path_file, (exists) => {
//         if(exists){
//             res.sendFile(path.resolve(path_file));
//         }else{
//             res.status(200).send({message: 'No existe la imagen'});
//         }
//     });
//  }

// module.exports = {
//     getUsers,
//     getUser,
//     getUserByNames,
//     updateUser,
//     deleteUser,
//     uploadImage,
//     removefileOfUploads,
//     getImageFile,
// }