var express = require('express');
var bodyParser = require('body-parser');
var converter = require('json-2-csv');

var router = express.Router();
router.use(bodyParser.json());

/* POST */
router.post('/', function(req, res, next) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  res.send('Under Construction');
});

module.exports = router;
