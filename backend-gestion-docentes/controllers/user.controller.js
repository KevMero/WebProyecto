'use strict'
var validator = require('validator');
var UserAdmin = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt')
var fs = require('fs');
var path = require('path');


var controller = {

    // este metodo sera para crear usuarios admin

    save: function(req, res) {
        //recoger parametros de la peticion
        var params = req.body;

        try {
            //validar datos
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(400).send({
                message: "Faltan datos por enviar"
            });

        }
            if (validate_email && validate_password) {

            //crear objeto de usuario

            var user = new UserAdmin();

            // asignar valores al usuario
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_ADMIN';


            // comprobar si el usuario existe
            UserAdmin.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar la duplicidad del usuario"
                    });
                }
                if (!issetUser) {

                    // si no existe cifrar la contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        // guardar usuario
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });

                            }
                            if (!userStored) {
                                return res.status(500).send({
                                    message: "El usuario no se ha guardado"
                                });

                            }
                            // devolver respuesta

                            return res.status(200).send({ status: 'success', message: 'Usuario creado' });

                        }); // close save
                    }); //close bcrypt

                } else {
                    return res.status(400).send({
                        message: "El usuario ya existe"
                    });

                }
            });

        } else {
            return res.status(400).send({
                message: "Validacion de datos incorrecta, intentelo nuevamente"

            });

        }
    },

    
    login: function(req, res) {
        //recoger parametros de la peticion 
        var params = req.body;
        try {
            // validar los datos 
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(400).send({
                message: "Faltan datos por enviar"
            });
        }
        if (!validate_email || !validate_password) {

            return res.status(401).send({
                message: "Datos incorrectos"

            });
        }

        // buscar usuarios que coincidan con el email
        UserAdmin.findOne({ email: params.email.toLowerCase() }, (err, user) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al intentar identificarse"

                });

            }
            if (!user) {
                return res.status(404).send({
                    message: "El usuario no existe"

                });

            }

            //si lo encuentra
            // comprobar la contaseña (coincidencia de email y password / bcrypt)
            bcrypt.compare(params.password, user.password, (err, check) => {

                // si es correcto
                if (check) {

                        //limpiar objeto antes de devolverlo
                        user.password = undefined;

                        //devolver los datos

                        return res.status(200).send({
                            token: jwt.createToken(user)

                        });

                } else {
                    return res.status(401).send({
                        message: "Las credenciales no son correctas"

                    });

                }

            });
        });

    },
  

};

module.exports = controller;