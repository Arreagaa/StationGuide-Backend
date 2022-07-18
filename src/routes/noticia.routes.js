//IMPORTACIONES
const express = require('express');
const noticiaController = require('../controllers/noticia.controller');
const md_autentificacion = require('../middlewares/autentificacion');
const md_roles = require('../middlewares/roles');

//ini
var api = express.Router();

//rutas
api.get('/obtenerNoticias',[md_autentificacion.Auth],noticiaController.ObtenerNoticias);
api.get('/obtenerNoticiaId/:idNoticia',[md_autentificacion.Auth],noticiaController.ObtenerNoticiaId);
api.post('/agregarNoticia',[md_autentificacion.Auth, md_roles.verAdmin],noticiaController.agregarNoticia);
api.put('/editarNoticia/:idNoticia',[md_autentificacion.Auth, md_roles.verAdmin],noticiaController.editarNoticia);
api.delete('/eliminarNoticia/:idNoticia', [md_autentificacion.Auth, md_roles.verAdmin],noticiaController.eliminarNoticia);

module.exports = api;