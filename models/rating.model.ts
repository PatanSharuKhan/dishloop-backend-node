var mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    user_id: { type: Number, required: true },
    restaurant_id: { type: Number, required: true }
})

module.exports = mongoose.model("Rating", RatingSchema);
