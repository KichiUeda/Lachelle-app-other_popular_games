const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const App = require('../client/components/App.jsx');

describe('Basic test on FetchProductNumber() which parses product number out of URL in App.jsx', function () {

  it('should return default product id if there is no value to parse', function () {
    let isValid = App.getProductId(null)
    expect(isValid).should.equal(DEFAULT_PRODUCT_ID)
  }

  it('should return default product id if there is no number', function () {
    let isValid = App.getProductId("hello")
    expect(isValid).should.equal(DEFAULT_PRODUCT_ID)
  }

  it('should return the correct product number from a string of characters', function () {
    let isValid = App.getProductId("/abc/123")
    expect(isValid).should.equal(123)
  }

  it('should return a number from a string of characters', function () {
    let isValid = App.getProductId("/abc/123")
    expect(isValid).to.be.a('number');
  }

})