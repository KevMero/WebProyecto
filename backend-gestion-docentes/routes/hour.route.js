'use strict'

var express = require('express');
var HourController = require('../controllers/hour.controller');

var router = express.Router();



// rutas de usuarios api
router.post('/hour-input/:cedula', HourController.addInput); // registrar hora de entrada
router.post('/hour-output/:cedula', HourController.addOutput); // registrar hora de salida
router.post('/calculate/:employeeId/:month', HourController.calculatePayment); // calculo de pago

module.exports = router;