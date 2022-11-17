require('dotenv').config();

UsuarioController = require('./src/controllers/usuario.controller');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;                                                                
mongoose.connect(process.env.STATION_GUIDE, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");
    app.get('/', (req,res) => res.send('Helloo'));

    app.listen(process.env.PORT|| 3000, function () {
        console.log('Corriendo en el puerto', process.env.PORT)
    })
    
    UsuarioController.RegistrarAdmin();

}).catch(error => console.log(error));