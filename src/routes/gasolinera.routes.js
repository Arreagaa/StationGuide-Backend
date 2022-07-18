//IMPORTACIONES
const express = require('express');
const gasolineraController = require('../controllers/gasolinera.controller');
const md_autentificacion = require('../middlewares/autentificacion');
const md_roles = require('../middlewares/roles');

//ini
var api = express.Router();

//rutas
api.get('/obtenerGasolineras',gasolineraController.ObtenerGasolineras);
api.get('/obtenerGasolineraId/:idGas',[md_autentificacion.Auth],gasolineraController.ObtenerGasolineraId);
api.post('/agregarGasolinera',[md_autentificacion.Auth, md_roles.verAdmin],gasolineraController.agregarGasolinera);
api.put('/editarGasolinera/:idGas',[md_autentificacion.Auth, md_roles.verAdmin],gasolineraController.editarGasolinera);
api.delete('/eliminarGasolinera/:idGas', [md_autentificacion.Auth, md_roles.verAdmin],gasolineraController.eliminarGasolinera);

module.exports = api;