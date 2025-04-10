var app = require('../app')
var request = require('supertest')
var messages = require('../routes/messages')

describe('Menu items', () => {
    it('Should list menu items', async () => {
        const response = await request(app).get('/menu').expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toBe(messages.success.fetch)
    })
})