const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sucursalSchema = Schema ({
    nombreSucursal: String,
    direccion: String,
    departamento: String,
    super: Number,
    regular: Number,
    diesel: Number,
    idGasolinera:{type:Schema.Types.ObjectId, ref:'gasolineras'}
});

module.exports = mongoose.model('sucursales', sucursalSchema);