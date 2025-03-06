const mongoose = require('mongoose');

const getConnection = async () => {  
    try {
        const url = 'mongodb+srv://eduin_padilla:edwinpa1015m@apppeliculas.3vdbm.mongodb.net/appweb?retryWrites=true&w=majority&appName=AppPeliculas';

        await mongoose.connect(url);

        console.log('Conexión exitosa');
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getConnection };
