var express = require("express")
var router = express.Router()
var Restaurant = require("../models/restaurant.model.ts")

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
    res.status(200).json({ message: 'Fetched Restaurants Successfully', restaurants })
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
  const { name, address, rating } = req.body
  try {
    const restaurant = new Restaurant({ name, address, rating })
    await restaurant.save();
    res.status(200).json({ message: "Restaurant created successfully", data: restaurant })
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
    res.status(200).json({ message: "Restaurant fetched successfully", data: restaurant })
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
    res.status(200).json({ message: "Restaurant updated successfully" })
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
    res.status(200).json({ message: "Restaurant Deleted Successfully" })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

module.exports = router
