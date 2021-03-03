'use strict'
// conectar a la base de datos MongoDB
var mongoose = require('mongoose');
// exportar configuracion de express
var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Proyecto:Kevin42899@cluster0.cmnr4.mongodb.net/Datos', { useNewUrlParser: true })
//mongoose.connect('mongodb://localhost:27017/AdministracionDB', { useNewUrlParser: true })
    .then(() => {

        console.log('conexion a MongoDB correcta');

        // crear servidor
        app.listen(port, () => {
            console.log("El servidor http://localhost:3999 esta funcionando");
        });

    })
    .catch(error => console.log(error));