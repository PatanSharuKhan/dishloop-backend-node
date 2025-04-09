import { MongoMemoryServer } from 'mongodb-memory-server'
var Menu = require('../models/menu.model')
var Restaurant = require('../models/restaurant.model')
import { connectDB, disconnectDB } from '../db/db';

let mongod: MongoMemoryServer;
beforeAll(async () => {
    try {
        mongod = await MongoMemoryServer.create()
        process.env.RESTAURANT_DATABASE_URL = mongod.getUri()
        console.log('Inmemory mongodb started.')

        await connectDB()
        await Menu.insertMany([
            { name: 'Idly', price: 5, quantity: 5 },
            { name: 'Dosa', price: 10, quantity: 5 },
            { name: 'Upma', price: 20, quantity: 5 },
        ])
        await Restaurant.insertMany([
            { name: 'Hotel 1', address: 'Address something', rating: 3 },
        ])
    } catch (e) {
        console.error('Error connecting Database:', e)
    }
})

afterAll(async () => {
    try {
        await Menu.deleteMany({})
        await Restaurant.deleteMany({})
        await disconnectDB()

        if (mongod) {
            await mongod.stop()
            console.log('Inmemory mongodb ended.')
        }
    } catch (e) {
        console.error('Error disconnecting the database:', e)
    }

})
