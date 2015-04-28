var express = require('express');
var bodyParser = require('body-parser');
var converter = require('json-2-csv');

var router = express.Router();
router.use(bodyParser.json());

/* POST */
router.post('/json2csv', function(req, res, next) {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }

  converter.json2csv(req.body, function(err, csv) {
    if (err) throw err;
    // console.log(csv);
    res.send(csv);
  });

});

module.exports = router;
