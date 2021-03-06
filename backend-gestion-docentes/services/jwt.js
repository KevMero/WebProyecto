'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave-secreta";

exports.createToken = function(user) {
    // payload es el objeto que se va a usar para generar el token
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }

    return jwt.encode(payload, secret)
}