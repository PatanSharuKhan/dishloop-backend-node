var mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_amount: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    payment_method: { type: String, enum: ['Cash', 'Card', 'UPI'], required: true },
    payment_status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
    delivery_address: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("Order", OrderSchema)
