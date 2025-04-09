var express = require('express');
var router = express.Router();
var Menu = require('../models/menu.model.ts');

/* GET menu listing. */
router.get('/', async function(req, res, next) {
    const items = await Menu.find({})
  res.status(200).json(items);
});

module.exports = router;
