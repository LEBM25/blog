'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var comentarios = Schema({
  comment: String, 
  fgActivo: Boolean,
  userid: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  publicacionId: { type: Schema.Types.ObjectId, ref: 'Publicacion' },
  fechaCreacion: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Comentario", comentarios);