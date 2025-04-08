var express = require('express');
var router = express.Router();

/* GET menu listing. */
router.get('/', function(req, res, next) {
    const items = [{id: 1, title: 'item-1'}]
  res.status(200).json(items);
});

module.exports = router;
