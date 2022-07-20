const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Sucursal = require('../models/sucursal.model');


function ObtenerSucursales (req, res) {
    var idGasolinera = req.params.idGas;

    /*Sucursal.find((err, sucursalesObtenidas) => {
        
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ sucursales: sucursalesObtenidas })
    })*/

    Sucursal.find({idGasolinera: idGasolinera}, (err, sucursalesObtenidas)=>{
        if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
        if(!sucursalesObtenidas) return res.status(404).send({mensaje : "Error, no se encuentran Sucursales en dicho Gasolinera."});

        return res.status(200).send({sucursales: sucursalesObtenidas});
    }).populate('idGasolinera')
}

function ObtenerSuper (req, res) {

    Sucursal.find().sort({super: +1 }).exec((err, gasolinerasObtenidas) => {
        
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ sucursales: gasolinerasObtenidas })
    })
}

function ObtenerRegular (req, res) {

    Sucursal.find().sort({regular: +1 }).exec((err, gasolinerasObtenidas) => {
        
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ sucursales: gasolinerasObtenidas })
    })
}

function ObtenerDiesel (req, res) {

    Sucursal.find().sort({diesel: +1 }).exec((err, gasolinerasObtenidas) => {
        
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ sucursales: gasolinerasObtenidas })
    })
}

function ObtenerSucursalId(req, res){
    var idSucursal = req.params.idSucursal;

    Sucursal.findById(idSucursal,(err,sucursalEncontrada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!sucursalEncontrada) return res.status(404).send( { mensaje: 'Error al obtener la sucursal' });

        return res.status(200).send({ sucursales: sucursalEncontrada });
    })
}

function agregarSucursal(req, res){
    var parametros = req.body;
    var sucursalModel = new Sucursal();
  
    if(parametros.nombreSucursal, parametros.direccion, parametros.departamento, parametros.super, parametros.regular, parametros.diesel){
        sucursalModel.nombreSucursal = parametros.nombreSucursal;
        sucursalModel.direccion = parametros.direccion;
        sucursalModel.departamento = parametros.departamento;
        sucursalModel.super = parametros.super;
        sucursalModel.regular = parametros.regular;
        sucursalModel.diesel = parametros.diesel;
        sucursalModel.idGasolinera = parametros.idGasolinera;
                Sucursal.find({nombreSucursal: parametros.nombreSucursal}
                ,(err, sucursalGuardada)=>{
                if(sucursalGuardada.length == 0){
                    sucursalModel.save((err, sucGuardada) => {
                            if(err) return res.status(500).send({mensaje: 'No se realizo la accion'});
                            if(!sucGuardada) return res.status(404).send({mensaje: 'No se agrego la sucursal'});
  
                            return res.status(201).send({sucursales: sucGuardada});
                         })
                }else{
                    return res.status(500).send({ mensaje: 'Error en la peticion' });
                }
            })
    }else{
            return res.status(500).send({ mensaje: 'Complete campos' });
    }
}

function editarSucursal(req, res){
    var idSucursal = req.params.idSucursal;
    var paramentros = req.body;

    Sucursal.findByIdAndUpdate({_id: idSucursal, nombreSucursal: paramentros.nombreSucursal}, paramentros,{new:true},
        (err, sucursalEditada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!sucursalEditada) return res.status(400).send({mensaje: 'No se puede editar la sucursal'});
                
            return res.status(200).send({sucursales: sucursalEditada});
    })
}


function eliminarSucursal(req, res){
    var idSucursal = req.params.idSucursal;

    Sucursal.findByIdAndDelete({_id: idSucursal},(err, sucursalEliminada)=>{
                
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!sucursalEliminada) return res.status(400).send({mensaje: 'No es puede eliminar la sucursal'});
                
            return res.status(200).send({sucursales: sucursalEliminada});
        })
}


module.exports = {
    ObtenerSucursales,
    agregarSucursal,
    ObtenerSucursalId,
    editarSucursal,
    eliminarSucursal,
    ObtenerSuper,
    ObtenerRegular,
    ObtenerDiesel
}