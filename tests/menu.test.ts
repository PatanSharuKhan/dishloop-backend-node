var app = require('../app')
var request = require('supertest')

describe('Menu items', () => {
    it('Should display menu items', async () => {
        const response = await request(app).get('/menu').expect('Content-Type', /json/).expect(200);
        expect(Array.isArray(response.body)).toBe(true)
    })
})