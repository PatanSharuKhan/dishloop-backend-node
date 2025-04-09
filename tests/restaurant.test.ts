var app = require('../app')
var request = require('supertest')

describe('Restaurants', () => {
    it('Should display restaurants', async () => {
        const response = await request(app).get('/restaurants').expect('Content-Type', /json/).expect(200);
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body[0].name).toEqual('Hotel 1')
    })
})