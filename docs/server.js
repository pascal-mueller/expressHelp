var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');

// Create a new Express application.
var app = express();

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

//
// Routes
//

// Index
app.get('/', (req, res) => {
    res.send('hello :)');
  });

// Register
app.post('/register', (req, res) => {
  db.users.create(req.body, () => {
    res.status(200).send("registered")
  });
});

// Login
app.post('/login', (req, res) => {
  console.log("---" + req.body)
  db.users.login(req.body.email, req.body.password, (user) => {
    res.status(200).send(user)
  });
});

// Server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("server started " + port);
 