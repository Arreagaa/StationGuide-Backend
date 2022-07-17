const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noticiaSchema = Schema ({
    titulo: String,
    contenido: String,
    fecha: String,
    editorial: String
});

module.exports = mongoose.model('noticias', noticiaSchema);