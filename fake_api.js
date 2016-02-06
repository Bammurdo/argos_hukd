// Welcome to fake_api
// this api recieves a json obj of deals, and returns a "competition" price for each one
// this is to simulate an api of another merchant
// it pretends to look up the fake merchants price of the product, and returns it for each product sent
// (in actual fact, it will generate a price ~ the value of the product sent)


// USAGE:

// recieves a list of items, and their price
// returns a list of the fake_api's price for that product
// req =
//  {
//    items[
//      {'product_name':'Toy', 'price':'7.99'},
//      {'product_name':'Car', 'price':'7999.00'},
//      {'product_name':'Toy House', 'price':'79.90'}
//    ]
//  }
// res =
//  {
//    items[
//      {'ourPrice':'17.99'},
//      {'ourPrice':'7000.00'},
//      {'ourPrice':'20.90'}
//    ]
//  }
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 8181;  // port for fake_api

app.use(bodyParser.json());

// routes
app.post('/', function(req, res) {
  var fake_api_deals = { 'items': []};    // return object
  // for each product that was sent
  for(var i=0;i<req.body.items.length;i++){
    var hukdPrice = req.body.items[i].price;  // HUKD price, as string
    if (isNaN(hukdPrice) || hukdPrice === null){
      hukdPrice = 1000; // if hukd doesn't give us a price, lets just use £10
    }else{
      hukdPrice = parseFloat(hukdPrice) * 100;
    }
    var random_price_diff = Math.floor(Math.random() * 851) - 100;  // add a random amount between -100 and 750
    // This means the price could be £1 cheaper or £7.50 more @ our fake api store
    var fapiPrice = Math.floor(hukdPrice + random_price_diff) / 100;
    fake_api_deals.items[i] = {'ourPrice': fapiPrice};
  }
  res.send(JSON.stringify(fake_api_deals, null, 2));
});

app.listen(port, function() {
  console.log('Fake_api service on port: ' + port);
});
