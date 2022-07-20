const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sucursalSchema = Schema ({
    nombreSucursal: String,
    direccion: String,
    departamento: String,
    SuperGas: Number,
    regular: Number,
    diesel: Number,
    market: Boolean,
    idGasolinera:{type:Schema.Types.ObjectId, ref:'gasolineras'}
});

module.exports = mongoose.model('sucursales', sucursalSchema);