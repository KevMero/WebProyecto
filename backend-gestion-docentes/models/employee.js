'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HourSchema = Schema({
    mes: String,
    fecha: String,
    hora_entrada: String,
    hora_salida: String,
    horas_trabajadas: String,
    estado: String,
    employeeId: String


});

var EmployeeSchema = Schema({
    cedula: String,
    nombre: String,
    apellido: String,
    estado: String,
    cargo: String,
    precio: String,
    hours: [HourSchema]
});




module.exports = mongoose.model('Employee', EmployeeSchema)