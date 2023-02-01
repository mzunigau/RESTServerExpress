const {
    response
} = require('express')


const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
};

const usuariosPut = (req, res = response) => {
    res.status(200).json({
        msg: 'get API - controlador'
    });
};

const usuariosPost = (req, res = response) => {
    res.status(201).json({
        msg: "post API - controlador"
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