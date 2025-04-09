var app = require('../app')
var request = require('supertest')

describe('Restaurants', () => {
    it('List restaurants', async () => {
        const response = await request(app).get('/restaurants').expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual('Fetched Restaurants Successfully')
    })

    it('Add restaurant', async () => {
        const response = await request(app).post('/restaurants').send({ name: 'Restaurant-1', address: 'Address-1', rating: 1 }).expect('Content-Type', /json/).expect(200);
    })

    it('Get restaurant by Id', async () => {
        const restaurants = await request(app).get('/restaurants').expect('Content-Type', /json/).expect(200);
        const response = await request(app).get(`/restaurants/${restaurants.body.restaurants[0]._id}`).expect(200);
        expect(response.body.message).toEqual('Restaurant fetched successfully')
    })

    it('Update restaurant', async () => {
        const restaurant = await request(app).post('/restaurants').send({ name: 'Restaurant-1', address: 'Address-1', rating: 1 })
        const response = await request(app).put(`/restaurants/${restaurant.body.data._id}`).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual('Restaurant updated successfully')
    })

    it('Delete restaurant', async () => {
        const restaurants = await request(app).get('/restaurants').expect('Content-Type', /json/).expect(200);
        const response = await request(app).delete(`/restaurants/${restaurants.body.restaurants[0]._id}`).expect('Content-Type', /json/).expect(200);
        expect(response.body.message).toEqual('Restaurant Deleted Successfully')
    })
})