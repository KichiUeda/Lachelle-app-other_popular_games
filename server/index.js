require('dotenv').config(); 
const express = require('express');
const app = express()
const PORT = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');
const { findGamesInSameGenre } = require('../database/index.js');

//app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(PORT, (error) => {
  if (error) {
    console.log('Server connection failed: ', error);
  }
  console.log('Server listening on port ', PORT);
});

app.get('/OtherPopularGames/:product_id', (req, res) => {

  if (!req.params.product_id) {
    res.status(400).send("A product ID is needed");
  } else {
    return findGamesInSameGenre( req.params.product_id )
        .then(genreData => console.log(genreData))
        .catch(error => console.log('ERROR', error));
  }
  next();
});


