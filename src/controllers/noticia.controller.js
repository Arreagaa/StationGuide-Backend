const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Noticia = require('../models/noticia.model');


function ObtenerNoticias (req, res) {

    Noticia.find((err, noticiasObtenidas) => {
        
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ noticias: noticiasObtenidas })
    })
}

function ObtenerNoticiaId(req, res){
    var idNoticia = req.params.idNoticia;

    Noticia.findById(idNoticia,(err,noticiaEncontrada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!noticiaEncontrada) return res.status(404).send( { mensaje: 'Error al obtener la noticia' });

        return res.status(200).send({ noticias: noticiaEncontrada });
    })
}

function agregarNoticia(req, res){
    var parametros = req.body;
    var noticiaModel = new Noticia();
  
    if(parametros.titulo, parametros.contenido, parametros.fecha, parametros.editorial){
        noticiaModel.titulo = parametros.titulo;
        noticiaModel.contenido = parametros.contenido;
        noticiaModel.fecha = parametros.fecha;
        noticiaModel.editorial = parametros.editorial;
                Noticia.find({titulo: parametros.titulo}
                ,(err, noticiaGuardada)=>{
                if(noticiaGuardada.length == 0){
                    noticiaModel.save((err, notGuardada) => {
                            if(err) return res.status(500).send({mensaje: 'No se realizo la accion'});
                            if(!notGuardada) return res.status(404).send({mensaje: 'No se agrego la noticia'});
  
                            return res.status(201).send({noticias: notGuardada});
                         })
                }else{
                    return res.status(500).send({ mensaje: 'Error en la peticion' });
                }
            })
    }else{
            return res.status(500).send({ mensaje: 'Complete campos' });
    }
}

function editarNoticia(req, res){
    var idNoticia = req.params.idNoticia;
    var paramentros = req.body;

    Noticia.findByIdAndUpdate({_id: idNoticia, titulo: paramentros.titulo}, paramentros,{new:true},
        (err, noticiaEditada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!noticiaEditada) return res.status(400).send({mensaje: 'No se puede editar la noticia'});
                
            return res.status(200).send({noticias: noticiaEditada});
    })
}


function eliminarNoticia(req, res){
    var idNoticia = req.params.idNoticia;

    Noticia.findByIdAndDelete({_id: idNoticia},(err, noticiaEliminada)=>{
                
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!noticiaEliminada) return res.status(400).send({mensaje: 'No es puede eliminar la noticia'});
                
            return res.status(200).send({noticias: noticiaEliminada});
        })
}


module.exports = {
    ObtenerNoticias,
    agregarNoticia,
    ObtenerNoticiaId,
    editarNoticia,
    eliminarNoticia
}