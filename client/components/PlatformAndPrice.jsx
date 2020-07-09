import React from 'react';
import styled from 'styled-components';

const PlatformAndPriceRowStyled = styled.div`
  display: inline-block;
  width: 95%;
  padding: 10px;
`;

const PlatformStyled = styled.div`
  display: block;
  float: left;
  margin: 0;
`;

const DiscountContainer = styled.div`
  display: block;
  float: left;
  margin:1px;
`;

const PriceButton = styled.div`
  cursor: pointer;
  display: block;
  float: right;
  height: 28px;
  width: 65px;
  border: 1px solid #3b3e48;
  border-radius: 3px;
  text-align: center;
`;

const PlatformAndPrice = (props) => {
  return (
    <PlatformAndPriceRowStyled>
      {/* <PlatformStyled>OS_Platform</PlatformStyled>
      <DiscountContainer>$3.00</DiscountContainer>
      <PriceButton>$40.00</PriceButton> */}
      <PlatformStyled>OS</PlatformStyled>
      <DiscountContainer>$4.00</DiscountContainer>
      <PriceButton>$40.00</PriceButton>
    </PlatformAndPriceRowStyled>
  );
};

export default PlatformAndPrice;

