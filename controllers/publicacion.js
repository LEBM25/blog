"use strict";

var Usuario = require("../models/usuario");
var Publicacion = require("../models/publicaciones");
var Comentario = require("../models/comentarios");
var fs = require('fs')
var controller = {};

controller.savePublicaciones = function (req, res) {
  var publicacion = new Publicacion();
  var parametros = req.body;
  publicacion.titulo = parametros.titulo;
  publicacion.publicacion = parametros.publicacion;
  publicacion.imagen = null;
  publicacion.estatus = 1;
  publicacion.fgActivo = true;
  publicacion.comentarios = [];
  publicacion.likes = [];
  publicacion.votos = 0;

  Usuario.find({ email: parametros.userName }, "_id").exec(function (
    err,
    usuarios
  ) {
    if (err) {
      res.status(500).send({
        message: "Error en el servidor " + err
      });
    } else {
      if (usuarios) {
        publicacion.userid = usuarios[0]._id;

        publicacion.save((err, publicacionSaved) => {
          if (err) {
            res.status(500).send({
              message: "Error en el servidor " + err
            });
          } else {
            if (publicacionSaved) {
              res.status(200).send({
                message: publicacionSaved
              });
            } else {
              res.status(200).send({
                message: "No se ha guardado la Fruta"
              });
            }
          }
        });
      } else {
        res.status(200).send({
          message: "No se ha guardado la Fruta"
        });
      }
    }
  });
};

controller.saveComentario = function (req, res) {
  var comentario = new Comentario();
  var parametros = req.body;
  comentario.comment = parametros.comentario;
  comentario.publicacionId = parametros.publicacionId;
  comentario.fgActivo = true;
  Usuario.find({ email: parametros.userName }, "_id").exec(function (
    err,
    usuarios
  ) {
    if (err) {
      res.status(500).send({
        message: "Error en el servidor " + err
      });
    } else {
      if (usuarios) {
        comentario.userid = usuarios[0]._id;
        comentario.save((err, comentarioSaved) => {
          if (err) {
            res.status(500).send({
              message: "Error en el servidor " + err
            });
          } else {
            if (comentarioSaved) {

              Publicacion.findByIdAndUpdate({ _id: comentarioSaved.publicacionId }, { $push: { comentarios: comentarioSaved._id } }, { new: true }, (err, updatepublicacion) => {
                if (!updatepublicacion) {
                  res.status(404).send({
                    message: "no se guardo "
                  });
                } else {
                  res.status(200).send({
                    message: updatepublicacion
                  });
                }
              })

            } else {
              res.status(200).send({
                message: "No se ha guardado el comentario"
              });
            }
          }
        });
      } else {
        res.status(200).send({
          message: "No se ha guardado el comentario"
        });
      }
    }
  });
};

controller.postList = function (req, res) {
  var query = Publicacion.find({})
  var parametros = req.body;
  if (parametros.q || parametros.q  != undefined){    
    if(parametros.q == 1) query = Publicacion.find({estatus:2}).sort({fechaCreacion : -1}).limit(5)
    else if (parametros.q == 2) query = Publicacion.find({estatus:2})
  }
  query.exec(function (err, postList) {
    Usuario.populate(postList, { path: "userid" }, function (err, postList) {
    
      if (err) {
        res.status(500).send({
          message: "Error en el servidor " + err
        });
      } else {
        if (postList) {
          res.status(200).send({
            message: postList
          });
        } else {
          res.status(500).send({
            message: "Error en el servidor " + err
          });
        }
      }

    })
  });
}

controller.upLoadImage = function (req, res) {
  var fileName = ''
  if (!req.files) {
    return res.status(404).send({
      status: error,
      message: "imagen no subida"
    })
    
  }

  try{
    var filePath = req.files.file0.path
    var fileSplit = filePath.split('\\')
    fileName = fileSplit[3]
    var extensionSplit = fileName.split('\.')
    var fileExt = extensionSplit[1]
    if (fileExt != 'png' && fileExt != 'jpg' && fileExt != 'jpeg' && fileExt != 'gif') {
      fs.unlink(filePath, (err) => {
        console.log(123)
        res.status(200).send({
          status: "error",
          message: "la extension de la imagen no es valida"
        });
      })
    } else {
      var publicacion = req.params.id
      Publicacion.findOneAndUpdate({ _id: publicacion }, { imagen: fileName }, { new: true }, (err, imagenPublicacionSave) => {
        if (err || !imagenPublicacionSave) {
          res.status(200).send({
            status: "error",
            message: "error al guardar la imagen de articulo"
          });
        } else {
          res.status(200).send({
            status: "success",
            message: imagenPublicacionSave
          });
        }
  
      })
    }
  }catch{
    var publicacion = req.params.id
    Publicacion.findOneAndDelete({ _id: publicacion },function(err,response){      
      return res.status(404).send({
        status: 'error',
        message: "imagen no subida"
      })
    })
    
  }
  
}

controller.postById = function (req, res) {

  var parametros = req.body
  var id = parametros.id
  Publicacion.find({ _id: id }, function (err, publicacion) {
      Usuario.populate(publicacion, { path: "userid" }, function (err, publicacion) {
        Usuario.populate(publicacion, { path: "likes" }, function (err, publicacion) {
          Comentario.find({publicacionId : parametros.id},function(err,comments){
            Usuario.populate(comments,{path: "userid"},function(err,comments){
              res.status(200).send({publicacion,comments});
            })
          })
          
        })
      })
    
  });
}

controller.deletePost = function(req,res){
  var parametros = req.body
  Publicacion.remove({_id : parametros.id},(err,deletePost) =>{
    if(err){
      res.status(500).send({
        status : "error",
        message: "No se pudo eliminar el Post"
      })
    }else{
      res.status(200).send({
        status: "success",
        message: "Post eliminado con exito"
      })
    }
  })
}

controller.aprobarPost = function(req,res){
  var parametros = req.body
  Publicacion.findOneAndUpdate({_id : parametros.id},{ estatus: parametros.nivel }, { new: true },(err,updatepublicacion) =>{
    if(err){
      res.status(500).send({
        status : "error",
        message: "No se pudo cambiar el estatus del post"
      })
    }else{
      res.status(200).send({
        status: "success",
        message: "Post actualizado con exito"
      })
    }
  })
}

controller.giveaLike = function(req,res){
  var parametros = req.body;
  var idUser = null
  Usuario.find({ email: parametros.userName }, "_id").exec(function (
    err,
    usuarios
  ) {
    if (err) {
      res.status(500).send({
        message: "Error en el servidor " + err
      });
    } else {
      if (usuarios) {
        console.log(parametros.id)
        idUser = usuarios[0]._id;
        Publicacion.findByIdAndUpdate({ _id: parametros.id }, { $push: { likes: idUser } }, { new: true }, (err, updatepublicacion) => {
          Usuario.populate(updatepublicacion, { path: "userid" }, function (err, updatepublicacion) {
    
            if (err) {
              res.status(500).send({
                message: "Error en el servidor " + err
              });
            } else {
              if (updatepublicacion) {
                res.status(200).send({
                  message: updatepublicacion
                });
              } else {
                res.status(500).send({
                  message: "Error en el servidor " + err
                });
              }
            }
      
          })
          
        })
      } else {
        res.status(200).send({
          message: "No se ha guardado el comentario"
        });
      }
    }
  });
}

module.exports = controller;
