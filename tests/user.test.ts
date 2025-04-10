var request = require('supertest')
var app = require('../app')
var messages = require('../routes/messages')
var User = require('../models/user.model')

describe('User', () => {
    let user;
    beforeAll(async () => {
        user = await User.findOne({})
    })

    it('Fetch users', async () => {
        const response = await request(app).get('/users').expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toBe(messages.success.fetch)
        expect(Array.isArray(response.body.users)).toBe(true)
    })

    it('Fetch user by invalid Id', async () => {
        const response = await request(app).get('/users/1').expect('Content-Type', /json/).expect(422);
    })

    it('Fetch user by valid Id', async () => {
        const response = await request(app).get(`/users/${user._id}`).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toBe(messages.success.fetch)
    })

    it('Create an user', async () => {
        const response = await request(app).post('/users').send({email: 'test', password: 'Test@123'}).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toBe(messages.success.create)
    })

    it('Update an user', async () => {
        const response = await request(app).put(`/users/${user._id}`).send({ email: 'test@gmail.com'}).expect(200);
        expect(response.body.message).toBe(messages.success.update)
    })

    it('Delete the user', async () => {
        const response = await request(app).delete(`/users/${user._id}`).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toBe(messages.success.delete)
    })

    it('Delete the user by invalid id', async () => {
        const response = await request(app).delete('/users/1').expect('Content-Type', /json/).expect(422);
    })
})
