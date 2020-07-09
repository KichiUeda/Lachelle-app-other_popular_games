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

//SIMPLIFiED -- CHECK NOW WITH MATTHEW
const otherPopularGamesSchema = mongoose.Schema({
  product_id: Number,
  genreName: String,
});

//ADD METHOD HERE OR CREATE MODEL DIR AND ADD MODEL THERE

const OtherPopularGames = mongoose.model('OtherPopularGames', otherPopularGamesSchema);

module.exports.db = db;
module.exports = OtherPopularGames;
//possible other db methods to be added
