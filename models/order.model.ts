var mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user_id: { type: Number },
    restaurant_id: { type: Number },
    total_amount: { type: Number },
    status: { type: String },
    payment_method: { type: String },
    payment_status: { type: String },
    delivery_address: { type: Text },
    placed_at: { type: String },
    updated_at: { type: String }
})

module.exports = mongoose.model("Order", OrderSchema)
