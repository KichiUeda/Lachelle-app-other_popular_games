import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Carousel from "./Carousel.jsx";
import axios from 'axios';

const AppWrapper = styled.div`
  width: 100%;
  height: 375.53px;
  background-color: #282c34;
`;
const AppStyled = styled.div`
  height: 305.53px;
  color: #a1a7b2;
`;

const DEFAULT_PRODUCT_ID = 21;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  fetchProductIds(productId) {

    return axios.get(`http://localhost:3007/OtherPopularGames/${productId}`)
      .then((response) => {
        let data = response.data;
        console.log('Success getting productids: ', data);
        return data;
      })
      .catch((err) => {
        console.log('Error updating views: ', err);
        return [];
      });
  }

  fetchImage(productIds) {
    //do I need to JSON stringify it, then place that into parameters for encoded URI too?
    const requestURL = `http://ec2-52-14-126-227.us-east-2.compute.amazonaws.com:3001/api/${productIds}?type=card`;

    return axios.get(requestURL)
      .then((response) => {
        let data = response.data;
        console.log('Success getting images string array from Micko: ', data);
        return data;
      })
      .catch((err) => {
        console.log('Error getting images string array from Micko: ', err);
        return [];
      });
    //return ["url1", "url2", "url3", "url4"];
  }

  convertIdArrToString (array) {
    let productIdString = '';
    productIds.forEach((idNum, index) => {
      if (index === 0) {
        productIdString + `?id=${idNum}`;
      } else {
        productIdString + `&id=${idNum}`;
      }
    })
    return productIdString;
  }

  fetchProductTitle(productIds) {

    let productIdsString = this.convertIdArrToString(productIds);
    const requestURL = `http://ec2-54-224-38-115.compute-1.amazonaws.com:5150/description/title/?${productIdsString}`;

    return axios.get(requestURL)
      .then((response) => {
        let arrOfProductsRcvd = response.data;
        let arrOfTitles = [];
        console.log('Success getting title from description service, which looks like this: ', response, response.data);
        arrOfTitles.forEach(item => {
          arrayOfTitles.push(item.title);
        })
        return arrOfTitles;
      })
      .catch((err) => {
        console.log('Error getting title from description service: ', err);
        return err;
      });
    //return ["title1", "title2", "title3", "title4"];
  }

  fetchProductPlatform(productIds) {

    //need to JSON stringify array, then place that into parameters for encoded URI, per Chris' instruction
    const requestArray = encodeURI(JSON.stringify(productIds));
    const requestURL = `http://ec2-3-129-17-68.us-east-2.compute.amazonaws.com:3002/system_req/platforms/${requestArray}`

    return axios.get(requestURL)
    .then((response) => {
      let data = response.data;
      console.log('Success getting platform and OS array from Chris: ', data);
      return data;
    })
    .catch((err) => {
      console.log('Error getting platform and OS array from Chris: ', err);
      return [];
    });
    // return [
    //   { os: ["urlLinux", "urlWindows"] },
    //   { os: ["urlMac", "urlLinux"] },
    //   { os: ["urlLinux"] },
    //   { os: ["urlWindows"] }
    // ];
  }

  fetchProductPriceAndPromo(productIds) {
    //do i need to JSON stringify it if it's already in string?
    const requestURL = `ec2-3-128-28-100.us-east-2.compute.amazonaws.com:3006/PriceAndPromotion/multiple/${productIds}`

    return axios.get(requestURL)
    .then((response) => {
      let data = response.data;
      console.log('Success getting price/promo array from my other service: ', data);
      return data;
    })
    .catch((err) => {
      console.log('Error getting price/promo array from my other service: ', err);
      return [];
    });
    //ask M about whether also including product_id is an issue. not using it, yet ...
    //but may need to for activating carousel functionality
    // return [
    //   { price: "price1", discount: "discount1" },
    //   { price: "price2", discount: "discount2" },
    //   { price: "price3", discount: "discount3" },
    //   { price: "price4", discount: "discount4" }
    // ]
  }

  fetchProducts(productIds) {
    console.log('fetchproducts received: ', productIds);
    // let gameName = fetchProductDescription(productId);
    let products = [];

    productIds.forEach(productId => products.push({
      gameName: `game${productId}`,
      image: `image${productId}`,
      platform: `plat${productId}`,
      discount: `disc${productId}`,
      price: `price${productId}`
    }));

    return products;
  }

  getProductId(path) {
    console.log('this.getProductId call success path=', path);
    if (path !== null) {
      let pathArray = path.split('/');

      if (pathArray.count > 0) {
        let productId = Number(pathArray[pathArray.length - 1]);
        if (productId !== NaN) {
          console.log('success pulling and parsing id: ', productId);
          return (productId);
        }
      }
    }
    return DEFAULT_PRODUCT_ID;
  }

  getProductIdFromUrl() {
    console.log('get id from URL called successfully. ', window.location.pathname);
    return this.getProductId(window.location.pathname);
  }

  componentDidMount() {

    let productId = this.getProductIdFromUrl();

    this.fetchProductIds(productId).then((productIds) => {
      this.setState({ data: this.fetchProducts(productIds) });
    });
  }

  render() {
    if (!this.state)
      return (null);

    return (
      <AppWrapper>
        <AppStyled>
          <Carousel values={this.state.data} />
        </AppStyled>
      </AppWrapper>
    );
  }
}

export default App;
