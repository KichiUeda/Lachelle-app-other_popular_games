const {OtherPopularGames } = require('./index.js');

//genre list assigned to game product_id
const genres = [
  "Action",
  "Adventure",
  "FPS",
  "Indie",
  "MMO",
  "Multiplayer",
  "Puzzle",
  "Racing",
  "Retro",
  "RPG",
  "Simulation",
  "Sports",
  "Stealth",
  "Strategy",
  "Tabletop",
  "Virtual Reality",
]

// generating 100 records to be used as test data
let seed = function () {
  let genreArrayOfGames = []
  for (var i = 1; i <= 100; i++) {
    let genreIndex = i % 16;
    genreArrayOfGames.push({
      product_id: i,
      genreName: genres[genreIndex]
    })
  }
  return genreArrayOfGames;
};

let seedToDB = function () {

  let data = seed();

  OtherPopularGames.insertMany(data, (error) => {
    if (error) {
      console.log("Seeding records error", error)
    }
    console.log('db seeded');
  })

};

seedToDB();

//Returns a file that can be stored as gist on github per requirements
// function seedToFile() {
//   let data = seed();
//   let jsonArray = JSON.stringify(data);
//   fs.writeFileSync('./database/otherPopularGames.js', jsonArray);
//   return data;
// };

// seedToFile();
