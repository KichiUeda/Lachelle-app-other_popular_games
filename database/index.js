const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OtherPopularGames', {
  useMongoClient: true,
});

const db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('openUri', function () {
  console.log('mongoose connected successfully');
});

const otherPopularGamesSchema = mongoose.Schema({
  genres: String,
  relatedGames: String
});

const OtherPopularGames = mongoose.model('OtherPopularGames', otherPopularGamesSchema);

module.exports.db = db;
module.exports = OtherPopularGames;
//db methods to be added

