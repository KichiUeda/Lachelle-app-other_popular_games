const assert = require('assert');
const OtherPopularGames = require('./database/index.js');

describe('Finding record', function () {

  beforeEach(function(done) {
    var newGameGenre = new OtherPopularGames({
      {
        "product_id": 5,
        "genreName": "Multiplayer"
      }
    });

    newGameGenre.save().then(function() {
      assert(newGameGenre.isNew === false);
      done();
    });

  });

  it('Finds a record in the database', function (done) {
    OtherPopularGames.findOne({}, { product_id: id }, {'genreName'})
    .then(function (err, results) {
      assert(result.genreName === 'Multiplayer');
    })
  })


})