'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserAdminSchema = Schema({
    email: String,
    password: String,
    role: String
});


module.exports = mongoose.model('User', UserAdminSchema)