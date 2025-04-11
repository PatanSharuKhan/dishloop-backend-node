var express = require('express');
var messages = require('./messages')
var Menu = require('../models/menu.model')
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const menus = await Menu.find({})
    res.status(200).json({ message: messages.success.fetch, menus })
  } catch (err) {
    res.status(422).json({error: err.message})
  }
});

module.exports = router;
