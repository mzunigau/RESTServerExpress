const {
    response
} = require('express')


const usuariosGet = (req, res = response) => {



    res.json({
        msg: 'get API - controlador'
    });
};

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.status(200).json({
        msg: 'get API - controlador',
        id
    });
};

const usuariosPost = (req, res = response) => {

    const {
        nombre,
        apellido
    } = req.body;

    res.status(201).json({
        msg: "post API - controlador",
        nombre,
        apellido
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