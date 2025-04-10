var mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
    order_id: { type: Number },
    menu_id: { type: Number },
    quantity: { type: Number },
    price: { type: Number }
})

module.exports = mongoose.model("OrderItem", OrderItemSchema)
