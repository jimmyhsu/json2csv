// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var converter = require('json-2-csv');

// router setup
var router = express.Router();
router.use(bodyParser.json());

/* POST */
router.post('/json2csv', function(req, res, next) {

  // if post request is empty or falsey
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }

  // convert to json through npm module
  converter.json2csv(req.body, function(err, csv) {
    if (err) throw err;
    // console.log(csv);

    // set to correct content type; MIME type; RFC 4180
    res.set({
      'Content-Type': 'text/csv',
    })
    res.send(csv);
  });

});

// export for router in app.js
module.exports = router;
