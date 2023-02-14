const {
    response,
    request
} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {
    validationResult
} = require('express-validator');


const usuariosGet = (req = request, res = response) => {
    const {
        q,
        nombre,
        apikey = 'no apikey'
    } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
};

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.status(200).json({
        msg: 'get API - controlador',
        id
    });
};

const usuariosPost = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    //Verificar correo
    const existeEmail = await Usuario.findOne({
        correo
    });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo esta en uso'
        });
    }


    //Ecriptar pw
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en db

    await usuario.save();

    res.status(201).json({
        msg: "post API - controlador",
        usuario
    });
};

const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: "delete API - controlador"
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}