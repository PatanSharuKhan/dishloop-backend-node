var express = require("express")
var messages = require("./messages")
var router = express.Router()
var Order = require("../models/order.model")
var OrderItem = require("../models/orderItem.model")

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find({})
    res.status(200).json({ message: messages.success.fetch, orders })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

router.post("/", async (req, res, next) => {
  const { user_id, payment_method, delivery_address, items } = req.body
  try {
    const order = await Order.create({
      user: user_id,
      payment_method,
      delivery_address,
    })
    const orderedItems = items.map(
      async (item) =>
        await OrderItem.create({
          order: order._id,
          restaurant: item.restaurant_id,
          menu: item.menu_id,
          quantity: item.quantity,
          price: item.price,
        })
    )
    res.status(200).json({ message: messages.success.create, order, orderedItems })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

module.exports = router
