"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");

const secreto = "blogSecreto";
exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    nombre: user.userName,
    email: user.email,
    nivel: user.nivel,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix
  };

  return jwt.encode(payload, secreto);
};
