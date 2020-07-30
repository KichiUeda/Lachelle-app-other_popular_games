import React from 'react';
import styled from 'styled-components';

const PlatformAndPriceRowStyled = styled.div`
  width: 95%;
  padding: 2px;
  bottom-padding: 2px;
`;

const PlatformStyled = styled.div`
  float: left;
`;
 
const DiscountContainer = styled.div`
  color: white;
  font-size: smaller;
  font-weight: bold;
  float: left;
  margin: 5px;
  width: 40px;
  height; 24px
  border: 1px solid green;
  border-radius: 3px;
  background-color: green;
`;

const PriceButton = styled.button`
  color: black;
  cursor: pointer;
  font-size: smaller;
  font-weight: bold;
  float: right;
  width: 40px;
  height: 24px;
  border: 1px solid #3b3e48;
  border-radius: 3px;
`;

const PlatformAndPrice = (props) => {
  console.log('props for platforms: ', props.values);
  let discount = ((props.values.discount)/(props.values.price) * 100);
  console.log('discount: ', discount)

  const platforms = props.values.platform.platforms;
  const os = props.values.platform.os;

  let combined = platforms.concat(os);
  console.log('array of platforms and os: ', combined);
  const platformsArray = combined.map((platform, index) => {
    console.log('platform and index via map: ', platform, index)
    return <img className='OPG-carousel-card-container-card-image-styled-file' src={platform[2]} alt="platform icon" width="21px" key={index}></img>;
  });
  return (
    <PlatformAndPriceRowStyled className='OPG-carousel-card-container-card-price-promo-row-styled'>
      <PlatformStyled className='OPG-carousel-card-container-card-price-promo-row-styled-platforms-array'>{platformsArray}</PlatformStyled>
      <DiscountContainer className='OPG-carousel-card-container-card-price-promo-row-styled-discount-array'>{props.values.discount}%</DiscountContainer>
      <PriceButton className='OPG-carousel-card-container-card-price-promo-row-styled-price-array'>${props.values.price}</PriceButton>
    </PlatformAndPriceRowStyled>
  );
};

export default PlatformAndPrice;

