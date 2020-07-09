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
  product_id: Number,
  genreName: String,
});

  let findGamesInSameGenre = (id) => {
    //console.log('id from server format: ', id);
    return OtherPopularGames.findOne({ product_id: id }, 'genreName')
    .then(genre => {
      console.log('got genre, now to search all games: ', genre);
      return OtherPopularGames.find({genreName: genre});
    })
    .catch(error) => {
      console.log(error);
      //need to flesh out proper error response
    }
  };

const OtherPopularGames = mongoose.model('OtherPopularGames', otherPopularGamesSchema);

module.exports.db = db;
module.exports = OtherPopularGames;
module.exports = { findGamesInSameGenre }
