const {
    response,
    request
} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {

    const {
        limite = 5, desde = 0
    } = req.query
    const query = {
        estado: true
    }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    });
};

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const {
        _id,
        password,
        google,
        correo,
        ...resto
    } = req.body;

    // Validar base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {
        new: true
    });

    res.status(200).json({
        usuario
    });
};

const usuariosPost = async (req, res = response) => {

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

const usuariosDelete = async (req, res = response) => {

    const {
        id
    } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: false
    }, {
        new: true
    });


    res.json({
        usuario
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}