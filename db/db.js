const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.RESTAURANT_DATABASE_URL || '').then(() => {
            console.log('Database connected!')
        }).catch(e => console.error('Error connecting to database:', e))
    } catch (e) {
        console.error('Error connecting the database:', e)
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.connection.close()
        console.log('Database disconnected!')
    } catch (e) {
        console.error('Error disconnecting the database:', e)
    }
}

module.exports = { connectDB, disconnectDB }
