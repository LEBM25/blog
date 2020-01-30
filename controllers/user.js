"use strict";

const bcrypt = require("bcrypt-nodejs");
var Usuario = require("../models/usuario");
var Publicacion = require("../models/publicaciones");
var Comentario = require("../models/comentarios");
var jwt = require("../services/services")
var controller = {};

controller.deleteUser = function(req,res){
  var parametros = req.body
  Usuario.remove({_id : parametros.id},(err,deleteUser) =>{
    if(err){
      res.status(500).send({
        status : "error",
        message: "No se pudo eliminar el usuario"
      })
    }else{
      res.status(200).send({
        status: "success",
        message: "Usuario eliminado con exito"
      })
    }
  })
}

controller.adminUser = function(req,res){
  var parametros = req.body
  Usuario.findOneAndUpdate({_id : parametros.id},{ nivel: parametros.nivel }, { new: true },(err,updateuser) =>{
    if(err){
      res.status(500).send({
        status : "error",
        message: "No se pudo eliminar el usuario"
      })
    }else{
      res.status(200).send({
        status: "success",
        message: "Usuario eliminado con exito"
      })
    }
  })
}

controller.userList = function (req, res) {
  Usuario.find({}).exec(function (err, userList) {
    if (err) {
      res.status(500).send({
        message: "Error en el servidor " + err
      });
    } else {
      if (userList) {
        res.status(200).send({
          message: userList
        });
      } else {
        res.status(500).send({
          message: "Error en el servidor " + err
        });
      }

    }
  }
  );
}

controller.userAuth = function (req, res) {
  var parametros = req.body;
  var email = parametros.email;
  var pass = parametros.pass;

  Usuario.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).send({ message: "error en la peticion" })
    } else {
      if (!user) {
        res.status(401).send({ message: "El usuario no existe" })
      } else {
        bcrypt.compare(pass, user.pass, function (err, check) {
          if (check) {
            if (parametros.gethash) {
              res.status(200).send({
                token: jwt.createToken(user), nivel: user.nivel , userName: user.email,id:user._id
              })
            } else {
              res.status(200).send({ user })
            }
            // retornar usuario logeado
          } else {
            res.status(401).send({ message: "El usuario no ha podido loguearse" })
          }
        })
      }
    }
  })
};

controller.saveUsuario = function (req, res) {
  var usuario = new Usuario();
  var parametros = req.body;

  if (!parametros.nombre) {
    res.status(401).send({
      message: "Debe ingresar el Nombre",
      codErr: 1
    });
  } else if (!parametros.email) {
    res.status(401).send({
      message: "Debe ingresar el email",
      codErr: 2
    });
  } else if (!parametros.pass) {
    res.status(401).send({
      message: "Debe ingresar una clave ",
      codErr: 3
    });
  } else {
    usuario.userName = parametros.nombre;
    usuario.email = parametros.email;
    usuario.pass = parametros.pass;
    usuario.nivel = 2;
    usuario.fgActivo = true;

    bcrypt.hash(usuario.pass, null, null, function (err, hash) {
      // Store hash in your password DB.
      usuario.pass = hash;
      usuario.save((err, usuarioSaved) => {
        if (err) {
          res.status(500).send({
            message: "Error en el servidor " + err
          });
        } else {
          if (usuarioSaved) {
            res.status(200).send({
              message: usuarioSaved
            });
          } else {
            res.status(200).send({
              message: "No se ha guardado el usuario"
            });
          }
        }
      });
    });
  }
};

controller.userProfile = function(req,res){
  
  var parametros = req.body
  Usuario.findOne({_id : parametros.id}, function(err,usuario){
    Publicacion.find({userid: parametros.id}).count().exec(function(err,countPost){
      Publicacion.find({likes: parametros.id}).count().exec(function(err,CountLikes){
        Comentario.find({userid: parametros.id}).count().exec(function(err,CountComments){          
          usuario.likes = CountLikes
          usuario.post = countPost
          usuario.comments = CountComments
          var contador={CountLikes,countPost,CountComments}
          res.status(200).send({usuario,contador})
        })
      })
    })
  })
}

controller.usuarioAdmin = function(){
  
  var usuarios =  new Usuario();
  Usuario.findOne({nivel : 1}, function(err,usuario){
    if(!usuario || usuario.length == 0){
      usuarios.userName = "admin";
      usuarios.email = "admin@admin.com";
      usuarios.pass = "12345678";
      usuarios.nivel = 1;
      usuarios.fgActivo = true;
      bcrypt.hash(usuarios.pass, null, null, function (err, hash) {
        usuarios.pass = hash;
        usuarios.save((err, usuarioSaved) => {
         console.log("user Admin creado",usuarioSaved)
        });
      })
      }
  })
}


module.exports = controller;