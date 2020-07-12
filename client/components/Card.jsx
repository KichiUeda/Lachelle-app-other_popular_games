import React from "react";
import styled from 'styled-components';
import CardImage from './CardImage.jsx';
import GameName from './GameName.jsx';
import PlatformAndPrice from './PlatformAndPrice.jsx';

const CardWrapper = styled.div`
  text-align: center;
`;

const CardContainer = styled.div`
  background-color: #ffff;
  color: #a1a7b2;
  width: 270px;
  height: 257px;
`;

const Card = (props) => {

  return (
    <CardWrapper>

      <CardContainer>
        <CardImage image={props.values.image} />
        <GameName name={props.values.gameName} />
        <PlatformAndPrice values={{
          platform: props.values.platform,
          discount: props.values.discount,
          price: props.values.price
        }} />
      </CardContainer>

    </CardWrapper>
  );
};

export default Card;