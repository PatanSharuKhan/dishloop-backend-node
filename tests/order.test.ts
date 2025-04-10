var request = require('supertest')
var app = require('../app')
var messages = require('../routes/messages')
var User = require('../models/user.model')

describe('Order', () => {
    let user;

    beforeAll(async () => {
        user = await User.findOne({})
    })

    it('list orders', async () => {
        const response = await request(app).get('/orders').expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toBe(messages.success.fetch)
    })

    it('add order', async () => {
        const response = await request(app).post('/orders').send({ user_id: user._id, payment_method: 'UPI', delivery_address: 'Somewhere testing address', items: [] })
        expect(response.body.message).toBe(messages.success.create)
    })
})