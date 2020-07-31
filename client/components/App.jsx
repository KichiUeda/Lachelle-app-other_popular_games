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
        return data;
      })
      .catch((err) => {
        return [];
      });
  }

  fetchImage(productIds) {
    const requestArray = encodeURI(JSON.stringify(productIds));
    const requestURL = `http://ec2-52-14-126-227.us-east-2.compute.amazonaws.com:3001/api/${requestArray}?type=thumbnail`;

    return axios.get(requestURL)
      .then((response) => {
        let data = response.data;
        return data;
      })
      .catch((err) => {
        return [];
      });
  }

  convertIdArrToString(array) {
    let productIdString = '';
    array.forEach((idNum, index) => {
      if (index === 0) {
        productIdString = productIdString + `?id=${idNum}`;
      } else {
        productIdString = productIdString + `&id=${idNum}`;
      }
    })
    return productIdString;
  }

  fetchProductTitle(productIds) {

    let productIdsString = this.convertIdArrToString(productIds);
    const requestURL = `http://ec2-54-224-38-115.compute-1.amazonaws.com:5150/description/title/${productIdsString}`;

    return axios.get(requestURL)
      .then((response) => {
        let arrProdDesc = response.data;
        return arrProdDesc;
      })
      .catch((err) => {
        return err;
      });

  }

  fetchProductPlatform(productIds) {

    const requestArray = encodeURI(JSON.stringify(productIds));
    const requestURL = `http://ec2-3-129-17-68.us-east-2.compute.amazonaws.com:3002/system_req/platforms/${requestArray}`

    return axios.get(requestURL)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return [];
      });
  }

  fetchProductPriceAndPromo(productIds) {
    const requestArray = encodeURI(JSON.stringify(productIds));
    const requestURL = `http://ec2-3-128-28-100.us-east-2.compute.amazonaws.com:3006/PriceAndPromotion/multiple/${requestArray}`

    return axios.get(requestURL)
      .then((response) => {
        let data = response.data;
        return data;
      })
      .catch((err) => {
        return [];
      });
  }

  fetchProducts(productIds) {

    return Promise.all([
      this.fetchProductTitle(productIds),
      this.fetchImage(productIds),
      this.fetchProductPlatform(productIds),
      this.fetchProductPriceAndPromo(productIds)])
      .then(data => {
        let products = [];
        productIds.forEach((productId, index) => {
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
        return products;
      })
      .catch((err) => {
        return [];
      });
  }

  getProductId(path) {
    if (path !== null) {
      let pathArray = path.split('/');

      if (pathArray.length > 0) {
        let productId = Number(pathArray[1]);
        if (productId !== NaN) {
          return (productId);
        }
      }

    }
    return DEFAULT_PRODUCT_ID;
  }

  getProductIdFromUrl() {

    if (window.location.pathname === '/') {
      return 21;
    } else {
      return this.getProductId(window.location.pathname);
    }
  }

  componentDidMount() {

    let productId = this.getProductIdFromUrl();

    this.fetchProductIds(productId)
      .then((productIds) => {
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
