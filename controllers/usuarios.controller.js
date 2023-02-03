const {
    response,
    request
} = require('express')


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