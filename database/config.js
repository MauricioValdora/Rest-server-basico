const mongoose = require('mongoose')

const dbConection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('base de datos online conectada')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos')
    }

}


module.exports = {
    dbConection
}