var express = require('express');
var app = express();

var port = 8080;

app.set('view engine', 'jade');
app.locals.pretty = true; // for pretty html ^-^
app.use(express.static(__dirname + '/public')); // allows js (jquery/api_caller) to be passed directly

// routes
app.get('/', function(req, res) {
  res.render('home.jade');
});
app.post('/', function(req, res) {
  // user wants the top ten!

  // call api.hotukdeals.com like in task1
  // wait for the data
  // put it into a JSONobj
  // return it and let api_caller display it nicely
  res.send({"test":"test"});
});

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
