import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectDB, disconnectDB } from '../db/db';
var Menu = require('../models/menu.model')
var Restaurant = require('../models/restaurant.model')
var User = require('../models/user.model')
var Order = require('../models/order.model')
var OrderItem = require('../models/orderItem.model')

let mongod: MongoMemoryServer;
beforeAll(async () => {
    try {
        mongod = await MongoMemoryServer.create()
        process.env.RESTAURANT_DATABASE_URL = mongod.getUri()
        console.log('Inmemory mongodb started.')

        await connectDB()
        const user = await User.create({ email: 'user@gmail.com', password: 'User@123' })
        const restaurant = await Restaurant.create({ name: 'Hotel 1', address: 'Address something', rating: 3, user: user._id })
        const menu = await Menu.create({ name: 'Idly', price: 5, stock: 5, restaurant: restaurant._id })
        const order = await Order.create({ user: user._id, payment_method: 'UPI', delivery_address: 'Something far away' })
        const orderItem = await OrderItem.create({ order: order._id, restaurant: restaurant._id, menu: menu._id, price: menu.price })
    } catch (e) {
        console.error('Error connecting Database:', e)
    }
})

afterAll(async () => {
    try {
        await OrderItem.deleteMany({})
        await Order.deleteMany({})
        await Menu.deleteMany({})
        await Restaurant.deleteMany({})
        await User.deleteMany({})
        await disconnectDB()

        if (mongod) {
            await mongod.stop()
            console.log('Inmemory mongodb ended.')
        }
    } catch (e) {
        console.error('Error disconnecting the database:', e)
    }

})
