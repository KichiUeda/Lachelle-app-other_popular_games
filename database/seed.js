const faker = require('faker');
const fs = require('fs');
const db = require('./index.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//used to store randomly generated genre arrays of game Ids for each of 16 genres
//these arrays will be passed to images, systemReqs endpoints to build up carousel of
//other related games
let genres = [
  {
    genreId: 1,
    genreName: "Action",
  },
  {
    id: 2,
    genreName: "Adventure",
  },
  {
    id: 3,
    genreName: "FPS",
  },
  {
    id: 4,
    genreName: "Indie",
  },
  {
    id: 5,
    genreName: "MMO",
   },
  {
    id: 6,
    genreName: "Multiplayer",
  },
  {
    id: 7,
    genreName: "Puzzle",
  },
  {
    id: 8,
    genreName: "Racing",
  },
  {
    id: 9,
    genreName: "Retro",
  },
  {
    id: 10,
    genreName: "RPG",
  },
  {
    id: 11,
    genreName: "Simulation",
  },
  {
    id: 12,
    genreName: "Sports",
  },
  {
    id: 13,
    genreName: "Stealth",
  },
  {
    id: 14,
    genreName: "Strategy",
  },
  {
    id: 15,
    genreName: "Tabletop",
  },
  {
    id: 16,
    genreName: "Virtual Reality",
  },
]

// generating 100 records because this is test data
let seedToRandom = function () {

  for (var i = 1; i <= 100; i++) {
    let randomGenreId = randomGameGenreId(0, 15);
    let randomGameId = i;
    genres[randomGenreId].genreRelatedGames.push(randomGameId);
  }
  //sampleFileGenerator(genres);
  return genres;
}


// generating 100 records because this is test data
let seedNotRandom = function () {
  let data = {
    product_id: //1 - 100
    genre: //string assigned to this game at this product_id
  }
  //ASK MATTHEW HOW HE WOULD WRITE THIS TO KEEP SIMPLE/CONSISTENT EACH TIME

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

//Returns an integer random number between min (included) and max (included):
function randomGameGenreId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Returns a file that can be stored as gist on github per school requirements
function seedToFile() {

  let genres = seed();
  //Following is used once to provide sample data for testing purposes
  //json, stringify obj
  let jsonArray = JSON.stringify(genres);
  //write array of games to file for gist requirement
  fs.writeFileSync('./database/otherPopularGames.js', jsonArray);
  //return array of games
  return otherPopularGames;
}

module.exports = { seedToDB, seed }