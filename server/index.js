require('dotenv').config(); //loading environment vars
const express = require('express');
const app = express()
const PORT = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');
const data = require('../database/seed.js');

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


// //send product id to Rane for genre
// app.get('/genre/:product_id', (req, res) => {
//   //Rane sends back genre
//   fetchers
//     .fetchEverythingElseForProduct(res.genre)  //******write this method per details below
//     //receive back array of productIds
//     .then((results) => {
//       //  send productIds to:  (Promises All or Helper fn's that call each of these services, manipulate data if needed/as needed)
//       //  Micko for images
//       //  Chris for PlatformsImages
//       //  myself for Price and Promotions for Name, Price, Discount
//       res.send(results);
//     })
//     .catch((err) => {
//       if (err) {
//         res.status(505).send(err, 'Please try again');
//       }
//     });
// });
//*****

// app.get('/genre/:product_id', (req, res) {
//   let data = data.seed();
// })
//look up product id in my database for which genre it is listed in
//query for that genre id for it's related product Ids array
//return array of product ids associated with that genre to server here
//send array of genre related product ids to Micko, myself P&P, and Chris OS

//
//to Micko's Image Service, I need to include in URL:
// multiple product ids
// type === 'carousel_images'
