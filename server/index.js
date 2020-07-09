require('dotenv').config(); //loading environment vars
const express = require('express');
const app = express()
const PORT = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');
//const data = require('../database/seed.js');
const { findGamesInSameGenre } = require('../database/index.js')

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

app.get('OtherPopularGames/:product_id', (req, res) => {
  // let { product_id } = req.params;

  // if (!product_id) {
  //   return res.status(400).send("A product ID is needed");
  // } else {
  //   findGamesInSameGenre( product_id )
  //   .then( arrayOfIds => {
    res.send(arrayOfIds).status(200)
  })
  //   .catch()
  // }
});
