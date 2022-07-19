const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Gasolinera = require('../models/gasolinera.model');


function ObtenerGasolineras (req, res) {

    Gasolinera.find().sort({precioBase: +1 }).exec((err, gasolinerasObtenidas) => {
        
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ gasolineras: gasolinerasObtenidas })
    })
}

function ObtenerGasolineraId(req, res){
    var idGasolinera = req.params.idGas;

    Gasolinera.findById(idGasolinera,(err,gasolineraEncontrada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!gasolineraEncontrada) return res.status(404).send( { mensaje: 'Error al obtener la gasolinera' });

        return res.status(200).send({ gasolineras: gasolineraEncontrada });
    })
}

function agregarGasolinera(req, res){
    var parametros = req.body;
    var gasolineraModel = new Gasolinera();
  
    if(parametros.nombreGas, parametros.email, parametros.direccion, parametros.departamento, parametros.precioBase){
        gasolineraModel.nombreGas = parametros.nombreGas;
        gasolineraModel.email = parametros.email;
        gasolineraModel.direccion = parametros.direccion;
        gasolineraModel.departamento = parametros.departamento;
        gasolineraModel.precioBase = parametros.precioBase;
                Gasolinera.find({nombreGas: parametros.nombreGas}
                ,(err, gasolineraGuardada)=>{
                if(gasolineraGuardada.length == 0){
                    gasolineraModel.save((err, gasGuardada) => {
                            if(err) return res.status(500).send({mensaje: 'No se realizo la accion'});
                            if(!gasGuardada) return res.status(404).send({mensaje: 'No se agrego la gasolinera'});
  
                            return res.status(201).send({gasolineras: gasGuardada});
                         })
                }else{
                    return res.status(500).send({ mensaje: 'Error en la peticion' });
                }
            })
    }else{
            return res.status(500).send({ mensaje: 'Complete campos' });
    }
}

function editarGasolinera(req, res){
    var idGasolinera = req.params.idGas;
    var paramentros = req.body;

    Gasolinera.findByIdAndUpdate({_id: idGasolinera, nombreGas: paramentros.nombreGas}, paramentros,{new:true},
        (err, gasolineraEditada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!gasolineraEditada) return res.status(400).send({mensaje: 'No se puede editar la gasolinera'});
                
            return res.status(200).send({gasolineras: gasolineraEditada});
    })
}


function eliminarGasolinera(req, res){
    var idGasolinera = req.params.idGas;

    Gasolinera.findByIdAndDelete({_id: idGasolinera},(err, gasolineraEliminada)=>{
                
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!gasolineraEliminada) return res.status(400).send({mensaje: 'No es puede eliminar la gasolinera'});
                
            return res.status(200).send({gasolineras: gasolineraEliminada});
        })
}


module.exports = {
    ObtenerGasolineras,
    agregarGasolinera,
    ObtenerGasolineraId,
    editarGasolinera,
    eliminarGasolinera,
}