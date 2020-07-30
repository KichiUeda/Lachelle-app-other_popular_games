import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Carousel from "./Carousel.jsx";
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AppWrapperCarousel = styled.div`
  width: 100%;
  height: 375.53px;
  background-color: #282c34;
  color: #a1a7b2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ArrowStyled = styled.i`
  align-self: center;
  font-size: 45px;
  padding-top: 55px;
  padding-right: 8px;
  padding-left: 8px;
  color: #929599;
  transition: color 0.3s ease-out;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const DEFAULT_PRODUCT_ID = 21;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  fetchProductIds(productId) {

    return axios.get(`http://ec2-3-128-28-100.us-east-2.compute.amazonaws.com:3007/OtherPopularGames/${productId}`)
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
  }

  fetchProducts(productIds) {
    console.log('fetchproducts received: ', productIds);
    return Promise.all([
      this.fetchProductTitle(productIds),
      this.fetchImage(productIds),
      this.fetchProductPlatform(productIds),
      this.fetchProductPriceAndPromo(productIds)])
      .then(data => {
        console.log('data from all', data);
        let products = [];
        productIds.forEach((productId, index) => {
          console.log('Index within card object creation: ', index);
          console.log('products array in forEach, ', data[0][index]);
          products.push(
            {
              product_id: productId,
              gameName: data[0][index].title,
              image: data[1][index].thumbnail,
              platform: { platforms: data[2][index].platforms, os: data[2][index].os },
              discount: data[3][index].promotion,
              price: data[3][index].price
            })
        });
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
      console.log('path array after split: ', pathArray);
      if (pathArray.length > 0) {
        let productId = Number(pathArray[pathArray.length - 1]);
        console.log('********getProductId fr URL fn result: ', productId)
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
    if (window.location.pathname === '/') {
      console.log('returned 21 as PID')
      return 21;
    } else {
      console.log('getting id from URL, not default: ', window.location.pathname)
      return this.getProductId(window.location.pathname);
    }
  }

  componentDidMount() {

    let productId = this.getProductIdFromUrl();
    console.log('*****get product Id from URL', productId)

    this.fetchProductIds(productId)
      .then((productIds) => {
        console.log('******product ids fetched - ready to fetch products: ', productIds)

        this.fetchProducts(productIds)

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
      <AppWrapperCarousel className='OPG-app-wrapper'>
        <ArrowStyled><FiChevronLeft className="left-chev" /></ArrowStyled>
        <Carousel values={this.state.data} />
        <ArrowStyled><FiChevronRight className="right-chev" /></ArrowStyled>
      </AppWrapperCarousel>
    );
  }
}

export default App;
