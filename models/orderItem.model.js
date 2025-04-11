var mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },

})

module.exports = mongoose.model("OrderItem", OrderItemSchema)
