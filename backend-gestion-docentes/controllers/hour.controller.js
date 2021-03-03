"use strict";
var Employee = require("../models/employee");
var validator = require("validator");
var moment = require("moment");

var controller = {

  addInput: function (req, res) {
    //recoger el id del empleado
    var cedula = req.params.cedula;

    // buscar por id del empleado
    Employee.findOne({ cedula: cedula }).exec((err, employee) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "error en la peticion",
        });
      }

      if (!employee) {
        return res.status(404).send({
          status: "error",
          message: "No existe el empleado",
        });
      } 
      if (employee.estado != 'ACTIVO') {
        return res.status(404).send({
          status: "error",
          message: "Este usuario se encuentra deshabilitado",
        });
      } else {
        // comprobar que el empleado no haya registrado su ingreso anteriormente

        if (employee.hours) {
          let registro = employee.hours.filter(
            (hour) => hour.fecha == moment().locale("es").format("dddd, LL") && hour.estado == 'Laborando'
          );

          if (registro.length != 0) {
            return res.status(400).send({
              status: "error",
              message: "Ya ha registrado su ingreso",
            });
          } else {
            // comprobar que se haya ingresado la cedula del empleado

            var hour = {
              employeeId: employee._id,
              mes: moment().locale("es").format("MMMM"),
              fecha: moment().locale("es").format("dddd, LL"),
              hora_entrada: moment().format("HH:mm"),
              hora_salida: 'No registrada',
              horas_trabajadas: 'No calculadas',
              estado: 'Laborando'
            };

            // en la propiedad hours del objeto resultante hacer un push
            employee.hours.push(hour);

            // guardar el empleado completo
            employee.save();

            return res.status(200).send({
              status: "success",
              message: "Entrada registrada",
            });
          }
        }
      }
    });
  },


  addOutput: function (req, res) {
    //recoger el id del empleado
    var cedula = req.params.cedula;

    // buscar por id del empleado

    Employee.findOne({ cedula: cedula }).exec((err, employee) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "error en la peticion",
        });
      }

      if (!employee) {
        return res.status(404).send({
          status: "error",
          message: "No existe el empleado",
        });
      } 
      if (employee.estado != 'ACTIVO') {
        return res.status(404).send({
          status: "error",
          message: "Este usuario se encuentra deshabilitado",
        });
      } 
      
      else {
        // comprobar que el empleado haya registrado su ingreso anteriormente

        if (employee.hours) {
          let registro = employee.hours.filter(
            (hour) => hour.fecha == moment().locale("es").format("dddd, LL") && hour.estado == 'Laborando'
          );

          if (registro.length == 0) {
            return res.status(400).send({
              status: "error",
              message: "No ha registrado su ingreso",
            });
          } else {

            //  calculo de horas
          let total_horas = moment.duration(moment() - moment(registro[0].hora_entrada,"HH:mm"));
         
            Employee.findOneAndUpdate({ "hours._id": registro[0]._id }, {
                "$set": {
                    "hours.$.hora_salida": moment().format("HH:mm"),
                    "hours.$.estado": 'Jornada culminada',
                    "hours.$.horas_trabajadas": total_horas.hours(),
                }
            }, { new: true }, (err, employeeUpdate) => {
               


                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error en la peticion'
                    });

                }
                if (!employeeUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el empleado'
                    });

                } else {
                    // devolver datos
                    return res.status(200).send({
                        status: 'success',
                        message: "Salida registrada",
                    });

                }

            });
          
          }
        }
      }
    });
  },

  calculatePayment: function (req, res) {

    let horas=[];
    let horas_totales = 0;
    let pago_total = 0.00;


    var employeeId = req.params.employeeId;
    var month = req.params.month;

    
    Employee.aggregate([
      {
        $unwind: "$hours",

      },
      {
        $match: {
          "hours.mes": month,
          "hours.employeeId": employeeId
        },
       
      },
      {

        "$replaceRoot": {
          "newRoot": {  precio: "$precio", hours: "$hours"}
        }
      }
    ]).exec((err, historyEmployee) => {
      if (err || !historyEmployee) {
          return res.status(404).send({
              status: 'error',
              message: 'No existe el registro'

          });

      }
      if(historyEmployee.length === 0){

        return res.status(404).send({
          status: 'error',
          message: 'No existe el registro'

      });
      }


      // realizar el calculo 

      //obtener las horas totales
      historyEmployee.forEach(history => {
       horas.push(+history.hours.horas_trabajadas)

     
      });

      // sumar horas totales
      horas.forEach (function(hora){
            horas_totales += hora;
      });

      // sacar el pago
    pago_total = horas_totales * historyEmployee[0].precio

      return res.status(200).send({
          status: 'success',
          horas_totales,
          precio: historyEmployee[0].precio,
          pagototal: pago_total.toFixed(2)

      });
  });

  },
 
};

module.exports = controller;
