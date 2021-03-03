'use strict'
var validator = require('validator');
var Employee = require('../models/employee');


var controller = {

    // este metodo sera para crear empleados

    save: function(req, res) {
        //recoger parametros de la peticion
        var params = req.body;

        try {
            //validar datos
            var validate_cedula = !validator.isEmpty(params.cedula);
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellido = !validator.isEmpty(params.apellido);
            var validate_cargo = !validator.isEmpty(params.cargo);
            var validate_precio = !validator.isEmpty(params.precio);

        } catch (err) {
            return res.status(400).send({
                message: "Faltan datos por enviar"
            });

        }
            if (validate_cedula && validate_nombre && validate_apellido && validate_cargo && validate_precio) {

            //crear objeto de empleado

            var employee = new Employee();

            // asignar valores al empleado
            employee.cedula = params.cedula;
            employee.nombre = params.nombre;
            employee.apellido = params.apellido;
            employee.estado = 'ACTIVO';
            employee.cargo = params.cargo;
            employee.precio = params.precio;


            // comprobar si el empleado existe
            Employee.findOne({ cedula: employee.cedula }, (err, issetEmployee) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar la duplicidad del usuario"
                    });
                }
                if (!issetEmployee) {

              
                        // guardar empleado
                        employee.save((err, employeeStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Error al guardar"
                                });

                            }
                            if (!employeeStored) {
                                return res.status(500).send({
                                    message: "El registro no se ha realizado"
                                });

                            }
                            // devolver respuesta

                            return res.status(200).send({ status: 'success', message: 'Registro exitoso' });

                        }); // close save

                } else {
                    return res.status(400).send({
                        message: "Este usuario ya ha sido registrado"
                    });

                }
            });

        } else {
            return res.status(400).send({
                message: "Validacion de datos incorrecta, intentelo nuevamente"

            });

        }
    },      
     getEmployees: function(req, res) {

        Employee.find().sort([['estado', 1]]).exec((err, employess) => {
          
            return res.status(200).send({
                status: 'success',
                employess

            });

        });

    },

    getEmployeeById: function(req, res) {
        var employeeId = req.params.employeeId;

        Employee.findById(employeeId).exec((err, employee) => {
            if (err || !employee) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el registro'

                });

            }
            return res.status(200).send({
                status: 'success',
                employee

            });
        });


    },
    activeORinactiveEmployee: function(req, res) {

        var employeeId = req.params.employeeId;

        Employee.findOne({_id: employeeId}).exec((err, employee) => {
            if (err || !employee) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el registro'

                });

            }
            if (employee.estado === 'ACTIVO') {
                employee.estado = 'INACTIVO';
                                
            }else {

                employee.estado = 'ACTIVO';

            }
            employee.save();
           
                // devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    message: `Usuario ${employee.estado}`,
                    

                });
          
        });


    },

    updateEmployee: function(req, res) {

        var employeeId = req.params.employeeId;

        var params = req.body;

        try {
            //validar datos
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellido = !validator.isEmpty(params.apellido);
            var validate_cargo = !validator.isEmpty(params.cargo);
            var validate_precio = !validator.isEmpty(params.precio);
            delete params.cedula;


        } catch (err) {
            return res.status(400).send({
                message: "Faltan datos por enviar"
            });

        }
            if (validate_nombre && validate_apellido && validate_cargo && validate_precio) {

        Employee.findOne({_id: employeeId}).exec((err, employee) => {
            if (err || !employee) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el registro'

                });

            }
            employee.nombre = params.nombre;
            employee.apellido = params.apellido;
            employee.cargo = params.cargo;
            employee.precio = params.precio;
          
            employee.save();
           
                // devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    message: `Usuario actualizado`,
                    

                });
          
        });
    }


    },
  

};

module.exports = controller;