var express = require("express")
var router = express.Router()
var Restaurant = require("../models/restaurant.model")
var Menu = require("../models/menu.model")
const messages = require("./messages.js")

router.get("/", async function (req, res, next) {
  try {
    const restaurants = await Restaurant.find({})
    res.status(200).json({ message: messages.success.fetch, restaurants })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

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

router.get("/:id", async function (req, res, next) {
  const restaurant_id = req.params.id
  try {
    const restaurant = await Restaurant.findById(restaurant_id)
    res.status(200).json({ message: messages.success.fetch, data: restaurant })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.put("/:id", async function (req, res, next) {
  const restaurant_id = req.params.id
  try {
    const restaurant = await Restaurant.findById(restaurant_id)
    res.status(200).json({ message: messages.success.update })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.delete("/:id", async function (req, res, next) {
  const restaurant_id = req.params.id
  try {
    await Restaurant.findByIdAndDelete(restaurant_id)
    res.status(200).json({ message: messages.success.delete })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.get("/:id/menu", async (req, res, next) => {
  const restaurant_id = req.params.id
  try {
    const menu = await Menu.find({ restaurant: restaurant_id })
    res.status(200).json({ message: messages.success.fetch, menu })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

module.exports = router
