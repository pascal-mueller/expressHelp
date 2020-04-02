const express = require('express')
const bodyParser = require('body-parser');
const mountRoutes = require('./routes')

// Init app object
const app = express()

// Init BodyParser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Mount routes
mountRoutes(app)


// Server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("server started " + port);


