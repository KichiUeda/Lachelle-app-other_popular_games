const faker = require('faker');
const fs = require('fs');
const db = require('./index.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// generating 100 records because this is test data
let seed = function () {
  for (var i = 0; i <= 100; i++) {
    genres[randomGameGenreId(1, 16)].product_id_Array.push(i);
  }
  sampleFileGenerator(genres);
  return genres;
}

//function to insert records into DB
let seedToDB = function () {
  //call seed fn
  let data = seed();

  //insert records into db
  return db.collection.insertMany(data)
    //response fr db
    .then(result => {
      console.log('Successfully inserted items: ', result);
      return result;
    })
    .catch(err => console.error(`Failed to insert documents: ${err}`));
};
//used to store randomly generated genre arrays of game Ids for each of 16 genres
//these arrays will be passed to images, systemReqs endpoints to build up carousel of
//other related games
let genres = [
  {
    id: 1,
    name: "Action",
    product_id_Array: []
  },
  {
    id: 2,
    name: "Adventure",
    product_id_Array: []
  },
  {
    id: 3,
    name: "FPS",
    product_id_Array: []
  },
  {
    id: 4,
    name: "Indie",
    product_id_Array: []
  },
  {
    id: 5,
    name: "MMO",
    product_id_Array: []
  },
  {
    id: 6,
    name: "Multiplayer",
    product_id_Array: []
  },
  {
    id: 7,
    name: "Puzzle",
    product_id_Array: []
  },
  {
    id: 8,
    name: "Racing",
    product_id_Array: []
  },
  {
    id: 9,
    name: "Retro",
    product_id_Array: []
  },
  {
    id: 10,
    name: "RPG",
    product_id_Array: []
  },
  {
    id: 11,
    name: "Simulation",
    product_id_Array: []
  },
  {
    id: 12,
    name: "Sports",
    product_id_Array: []
  },
  {
    id: 13,
    name: "Stealth",
    product_id_Array: []
  },
  {
    id: 14,
    name: "Strategy",
    product_id_Array: []
  },
  {
    id: 15,
    name: "Tabletop",
    product_id_Array: []
  },
  {
    id: 16,
    name: "Virtual Reality",
    product_id_Array: []
  },
]

//Returns an integer random number between min (included) and max (included):
function randomGameGenreId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Returns a file that can be stored as gist on github per school requirements
function sampleFileGenerator(genres) {
  //Following is used once to provide sample data for testing purposes
  //json, stringify obj
  let jsonArray = JSON.stringify(genres);
  //write array of games to file for gist requirement
  fs.writeFileSync('./database/otherPopularGames.js', jsonArray);
  //return array of games
  return otherPopularGames;
}

seedToDB();