const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gasolineraSchema = Schema ({
    nombreGas: String,
    email: String,
    direccion: String,
    departamento: String,
    precioBase: Number
});

module.exports = mongoose.model('gasolineras', gasolineraSchema);