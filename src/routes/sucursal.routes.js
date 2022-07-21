//IMPORTACIONES
const express = require('express');
const sucursalController = require('../controllers/sucursal.controller');
const md_autentificacion = require('../middlewares/autentificacion');
const md_roles = require('../middlewares/roles');

//ini
var api = express.Router();

//rutas
api.get('/obtenerSucursales/:idGas?',sucursalController.ObtenerSucursales);
api.get('/obtenerSuper',sucursalController.ObtenerSuper);
api.get('/obtenerRegular',sucursalController.ObtenerRegular);
api.get('/obtenerDiesel',sucursalController.ObtenerDiesel);
api.get('/obtenerSucursalId/:idSucursal',[md_autentificacion.Auth],sucursalController.ObtenerSucursalId);
api.post('/agregarSucursal',[md_autentificacion.Auth, md_roles.verAdmin],sucursalController.agregarSucursal);
api.put('/editarSucursal/:idSucursal',[md_autentificacion.Auth, md_roles.verAdmin],sucursalController.editarSucursal);
api.delete('/eliminarSucursal/:idSucursal', [md_autentificacion.Auth, md_roles.verAdmin],sucursalController.eliminarSucursal);

api.get('/ObtenerSuperMarket', sucursalController.ObtenerSuperMarket);

module.exports = api;
