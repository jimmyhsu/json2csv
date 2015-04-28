// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var converter = require('json-2-csv');

// router setup
var router = express.Router();
router.use(bodyParser.json());

/* POST */
router.post('/csv2json', function(req, res, next) {

  // if post request is empty or falsey
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }

  // convert to json through npm module
  // get first item (csv) in given json data
  converter.csv2json(req.body[0], function(err, json) {
    if (err) throw err;
    // console.log(json);

    // set correct content type; automatically detected in express
    // for explicity/mirroing/educational purposes
    res.set({
      'Content-Type': 'application/json',
    })
    res.send(json);
  });

});

// export for router in app.js
module.exports = router;
