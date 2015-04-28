// dependencies
var express   = require('express');

// routes
var json2csv = require('./lib/routes/json2csv.js');
var csv2json = require('./lib/routes/csv2json.js');

// setup
var app = express();

// set port
app.set('port', process.env.PORT || 1337);

// set up api with versioning
app.use('/api/v1', json2csv);
app.use('/api/v1', csv2json);

var server = app.listen(app.get('port'), function() {
  console.log('json2csv listening on port ' + server.address().port);
});

// export for tests
module.exports = app;