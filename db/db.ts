import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.RESTAURANT_DATABASE_URL || '').then(() => {
            console.log('Database connected!')
        }).catch(e => console.error('Error connecting to database:', e))
    } catch (e) {
        console.error('Error connecting the database:', e)
    }
}

export const disconnectDB = async () => {
    try {
        await mongoose.connection.close()
        console.log('Database disconnected!')
    } catch (e) {
        console.error('Error disconnecting the database:', e)
    }
}
