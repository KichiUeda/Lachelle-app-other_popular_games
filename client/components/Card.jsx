import React from "react";
import styled from 'styled-components';
import CardImage from './CardImage.jsx';
import GameName from './GameName.jsx';
import PlatformAndPrice from './PlatformAndPrice.jsx';

const CardWrapper = styled.div`
  text-align: center;
  margin: 0;
`;

const CardContainer = styled.div`
  background-color: #ffff;
  color: #a1a7b2;
  width: 270px;
  height: 257px;
  margin: 0 20px 0 0;
`;


const Card = (props) => {

  return (
    <CardWrapper className='OPG-carousel-card-wrapper'>
      <CardContainer className='OPG-carousel-card-container'>
        <CardImage className='OPG-carousel-card-container-card-image' image={props.values.image} />
        <GameName className='OPG-carousel-card-container-card-game-name' name={props.values.gameName} />
        <PlatformAndPrice className='OPG-carousel-card-container-card-price-promo' values={{
          platform: props.values.platform,
          discount: props.values.discount,
          price: props.values.price
        }} />
      </CardContainer>
    </CardWrapper>
  );
};

export default Card;