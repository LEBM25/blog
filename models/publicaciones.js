"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var publicaciones = Schema({
  titulo: String,
  publicacion: String,
  imagen: String,
  estatus: Number,
  fgActivo: Boolean,
  userid: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
  votos: Number,
  likes: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
  fechaCreacion: {
    type: Date,
    default: new Date()
  },
  fechaAprobacion : {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Publicacion", publicaciones);
