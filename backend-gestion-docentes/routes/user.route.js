'use strict'

var express = require('express');
var UserController = require('../controllers/user.controller');

var router = express.Router();



// rutas de usuarios api
router.post('/register', UserController.save); // registrar usuario admin
router.post('/login', UserController.login); // inicio de sesion

module.exports = router;