const express = require('express');
var cors = require('cors');
const {
    dbConnection
} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();


        //Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Body Parser
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }


    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo puerto ' + process.env.PORT);
        });
    }




}

module.exports = Server;