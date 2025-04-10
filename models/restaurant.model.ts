var mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number },
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model("Restaurant", RestaurantSchema)
