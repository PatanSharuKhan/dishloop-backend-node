var express = require("express")
var router = express.Router()
var Restaurant = require("../models/restaurant.model")
var Menu = require('../models/menu.model')
const messages = require("./messages.js")

/**
 * @swagger
 * /restaurants:
 *    get:
 *      tags: [Restaurant]
 *      summary: Get a list of restaurants
 *      responses:
 *        200:
 *          description: Array of items
 *        500:
 *          description: Server error
 */
router.get("/", async function (req, res, next) {
  try {
    const restaurants = await Restaurant.find({})
    res.status(200).json({ message: messages.success.fetch, restaurants })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

/**
 * @swagger
 * /restaurants:
 *    post:
 *      tags: [Restaurant]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [name, address]
 *              properties:
 *                name:
 *                  type: string
 *                address:
 *                  type: string
 *                rating:
 *                  type: number
 *      summary: Create a restaurant
 *      responses:
 *        200:
 *          description: Restaurant created successfully
 *        500:
 *          description: Server error
 */
router.post("/", async function (req, res, next) {
  const { name, address, rating, user_id } = req.body
  try {
    const restaurant = await Restaurant.create({
      name,
      address,
      rating,
      user: user_id,
    })
    res.status(200).json({ message: messages.success.create, data: restaurant })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

/**
 * @swagger
 * /restaurants/:id:
 *    get:
 *      tags: [Restaurant]
 *      summary: Get restaurant by Id
 *      responses:
 *        200:
 *          description: Returns the message and requested restaurant
 *        500:
 *          description: Server error
 */
router.get("/:id", async function (req, res, next) {
  const restaurant_id = req.params.id
  try {
    const restaurant = await Restaurant.findById(restaurant_id)
    res.status(200).json({ message: messages.success.fetch, data: restaurant })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

/**
 * @swagger
 * /restaurants/:id:
 *    put:
 *      tags: [Restaurant]
 *      summary: Update a restaurant
 *      responses:
 *        200:
 *          description: Returns the updated restaurant
 *        500:
 *          description: Server error
 */
router.put("/:id", async function (req, res, next) {
  const restaurant_id = req.params.id
  try {
    const restaurant = await Restaurant.findById(restaurant_id)
    res.status(200).json({ message: messages.success.update })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

/**
 * @swagger
 * /restaurants/:id:
 *    delete:
 *      tags: [Restaurant]
 *      summary: Delete a restaurant
 *      responses:
 *        200:
 *          description: Returns deleted object id with message
 *        500:
 *          description: Server error
 */
router.delete("/:id", async function (req, res, next) {
  const restaurant_id = req.params.id
  try {
    await Restaurant.findByIdAndDelete(restaurant_id)
    res.status(200).json({ message: messages.success.delete })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.get('/:id/menu', async (req, res, next) => {
  const restaurant_id = req.params.id
  try {
    const menu = await Menu.find({restaurant: restaurant_id})
    res.status(200).json({ message: messages.success.fetch, menu })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

module.exports = router
