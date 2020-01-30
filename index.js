'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = 3800

mongoose.connect('mongodb://localhost:27017/blog')
.then( ()=> {
  console.log('la conexion se realizo a mongodb')
  app.listen(port,() => {console.log('el server esta corriendo en localhost:3800')})
}).catch(err => console.log(err));