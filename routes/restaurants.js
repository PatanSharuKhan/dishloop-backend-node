var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant.model.ts');

/* GET restaurants listing. */
router.get('/', async function(req, res, next) {
    const items = await Restaurant.find({})
  res.status(200).json(items);
});

module.exports = router;
