var app = require('../app')
var request = require('supertest')
var messages = require('../routes/messages')
var User = require('../models/user.model')
var Restaurant = require('../models/restaurant.model')

describe('Restaurants', () => {
    let user;
    let restaurant;

    beforeAll(async () => {
        user = await User.findOne({})
        restaurant = await Restaurant.findOne({})
    })

    it('List restaurants', async () => {
        const response = await request(app).get('/restaurants').expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual(messages.success.fetch)
    })

    it('Add restaurant', async () => {
        const response = await request(app).post('/restaurants').send({ name: 'Restaurant-1', address: 'Address-1', rating: 1, user_id: user._id }).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual(messages.success.create)
    })

    it('Get restaurant by Id', async () => {
        const response = await request(app).get(`/restaurants/${restaurant._id}`).expect(200);
        expect(response.body.message).toEqual(messages.success.fetch)
    })

    it('Update restaurant', async () => {
        const response = await request(app).put(`/restaurants/${restaurant._id}`).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual(messages.success.update)
    })

    it('get restaurant specific menu items', async () => {
        const response = await request(app).get(`/restaurants/${restaurant._id}/menu`).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual(messages.success.fetch)
    })

    it('Delete restaurant', async () => {
        const response = await request(app).delete(`/restaurants/${restaurant._id}`).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual(messages.success.delete)
    })

})