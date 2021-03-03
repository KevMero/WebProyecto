'use strict'

var express = require('express');
var EmployeeController = require('../controllers/employee.controller');

var router = express.Router();



// rutas de usuarios api
router.post('/employee', EmployeeController.save); // guardar empleado
router.get('/employee', EmployeeController.getEmployees); //obtener todos los empleados
router.get('/employee/:employeeId', EmployeeController.getEmployeeById); //obtener un empleado en especifico por ID
router.delete('/employee/:employeeId', EmployeeController.activeORinactiveEmployee); // eliminar usuario
router.put('/employee/:employeeId', EmployeeController.updateEmployee); // editar empleado


module.exports = router;