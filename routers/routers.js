"use strict";

var express = require("express");
// var controllers = require("../controllers/controllers");
var user = require("../controllers/user");
var publicacion = require("../controllers/publicacion");
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir : './blog-vue/src/assets'})
var api = express.Router();


//********************************************************************* */
//*****************USER API******************************************** */
api.post("/saveuser", user.saveUsuario);
api.get("/userList", user.userList);
api.post("/userAuth", user.userAuth);
api.post("/deleteUser", user.deleteUser);
api.post("/adminUser", user.adminUser);
api.post("/userProfile", user.userProfile);
user.usuarioAdmin()



//********************************************************************* */
//*****************POST API******************************************** */
api.post("/savepublicacion", publicacion.savePublicaciones);
api.post("/saveComentario", publicacion.saveComentario);
api.get("/postList/:q?", publicacion.postList);
api.post("/postList/:q?", publicacion.postList);
api.post("/upload-image/:id",md_upload, publicacion.upLoadImage);
api.post("/postById", publicacion.postById);
api.post("/deletePost", publicacion.deletePost);
api.post("/aprobarPost", publicacion.aprobarPost);
api.post("/giveaLike", publicacion.giveaLike);


module.exports = api;
