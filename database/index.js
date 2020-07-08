const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OtherPopularGames', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('openUri', function () {
  console.log('mongoose connected successfully');
});

const otherPopularGamesSchema = mongoose.Schema({
  genreId: Number,
  genreName: String,
  genreRelatedGames: Array
});

const OtherPopularGames = mongoose.model('OtherPopularGames', otherPopularGamesSchema);

module.exports.db = db;
module.exports = OtherPopularGames;
//possible other db methods to be added
