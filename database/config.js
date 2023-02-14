const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(
            process.env.MONGODB_URI);

        console.log('Base de datos online');

    } catch (error) {
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}