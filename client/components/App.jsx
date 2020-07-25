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
    const requestArray = encodeURI(JSON.stringify(productIds));
    const requestURL = `http://ec2-52-14-126-227.us-east-2.compute.amazonaws.com:3001/api/${requestArray}?type=thumbnail`;

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

  convertIdArrToString(array) {
    console.log('helper function to convert array of PIDs to a string for Rane API: ', array);
    let productIdString = '';
    array.forEach((idNum, index) => {
      if (index === 0) {
        productIdString = productIdString + `?id=${idNum}`;
      } else {
        productIdString = productIdString + `&id=${idNum}`;
      }
    })
    console.log('pids converted to string of ids to send to rane: ', productIdString);
    return productIdString;
  }

  fetchProductTitle(productIds) {
    //console.log('rane api has PIDs', productIds);
    let productIdsString = this.convertIdArrToString(productIds);
    const requestURL = `http://ec2-54-224-38-115.compute-1.amazonaws.com:5150/description/title/${productIdsString}`;
    console.log('titles from Rane api: ', requestURL);
    return axios.get(requestURL)
      .then((response) => {
        let arrProdDesc = response.data;
        console.log('Success getting title from description service, which looks like this: ', response.data);
        return arrProdDesc;
      })
      .catch((err) => {
        console.log('Error getting title from description service: ', err);
        return err;
      });
    //return ["title1", "title2", "title3", "title4"];
  }

  fetchProductPlatform(productIds) {

    const requestArray = encodeURI(JSON.stringify(productIds));
    const requestURL = `http://ec2-3-129-17-68.us-east-2.compute.amazonaws.com:3002/system_req/platforms/${requestArray}`

    return axios.get(requestURL)
      .then((response) => {
        console.log('Success getting platform and OS array from Chris: ', response.data);
        return response.data;
      })
      .catch((err) => {
        console.log('Error getting platform and OS array from Chris: ', err);
        return [];
      });
    // return [
    //   { os: ["urlLinux", "urlWindows"]},
    //   { os: ["urlMac", "urlLinux"] },
    //   { os: ["urlLinux"] },
    //   { os: ["urlWindows"] }
    // ];
  }

  fetchProductPriceAndPromo(productIds) {
    const requestArray = encodeURI(JSON.stringify(productIds));
    const requestURL = `http://ec2-3-128-28-100.us-east-2.compute.amazonaws.com:3006/PriceAndPromotion/multiple/${requestArray}`

    return axios.get(requestURL)
      .then((response) => {
        let data = response.data;
        console.log('Success getting price/promo array from my other service: ', response.data);
        return data;
      })
      .catch((err) => {
        console.log('Error getting price/promo array from my other service: ', err);
        return [];
      });
    // return [
    //   { price: "price1", discount: "discount1" },
    //   { price: "price2", discount: "discount2" },
    //   { price: "price3", discount: "discount3" },
    //   { price: "price4", discount: "discount4" }
    // ]
  }

  fetchProducts(productIds) {
    console.log('fetchproducts received: ', productIds);
    // all below result in arrays of data by ProductId
    return Promise.all([
      this.fetchProductTitle(productIds), //product ids and titles
      this.fetchImage(productIds),        //product ids and images
      this.fetchProductPlatform(productIds),//product ids and platforms
      this.fetchProductPriceAndPromo(productIds)])
      .then(data => {
        console.log('data from all', data);
        let products = [];
        // for each productId, map the related product id's properties
        productIds.forEach((productId, index) => {
          console.log('Index within card object creation: ', index);
          console.log('products array in forEach, ', data[0][index]);
          products.push(
          {
          product_id: productId,
          //for given productId, grab title from array of titles at the same index as the productId??? Matthew ques
          gameName: data[0][index].title,

          // image: at same index of given productId, grab image url string from array of images,
          image: data[1][index].thumbnail,

          // platform: for given productId, HAVE MATTHEW counsel here
          platform: { platforms: data[2][index].platforms, os: data[2][index].os },

          // discount: for given productId, pull from array of discounts
          discount: data[3][index].promotion,

          // price: for given productId, pull from array of price
          price: data[3][index].price
        })});
        console.log('products array built: ', products);
        return products;
      })
      .catch((err) => {
        console.log('Error getting price/promo array from my other service: ', err);
        return [];
      });
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
    //get product id from url
    let productId = this.getProductIdFromUrl();
    //get related game product ids in same genre as url product id
    this.fetchProductIds(productId)
      .then((productIds) => {
        //call apis to fetch product id properties
        this.fetchProducts(productIds)
          //set state for all products -- that will become cards in carousel
          .then(products => {
            this.setState({
              data: products
            })
          });
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
