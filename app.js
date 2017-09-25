const Lyft = require('lyft-node');

var clientId = process.env.clientId;
var secret = process.env.secret;

const lyft = new Lyft(clientId, secret);

const express = require('express')
const app = express()

app.get('/near', function (req, res) {

  var lat = req.query.lat
  var lng = req.query.lng
  const query = {
    start: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      },
  };
   
  lyft.getNearbyDrivers(query)
    .then((result) => {
      result.nearby_drivers.forEach(function(element) {

        var responseList = [];
        for (var driver of element.drivers) {
          for (var location of driver.locations) {
            responseList.push(location);
          }
       }
          res.send(responseList)
      }, this);

    })
    .catch((error) => {
      console.log(error);
    });
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
