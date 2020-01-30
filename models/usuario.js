"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  userName: String,
  email : String,
  pass: String,
  nivel: Number,
  fechaRegistro: {
    type: Date,
    default: new Date()
  },
  fgActivo: Boolean
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
