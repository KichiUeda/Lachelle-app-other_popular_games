import React from "react";
import ReactDOM from "react-dom";
import ReactDOM from "react-dom";
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
  height: 221px;
  width: 270px;
`;

const Card = (props) => {
  return (
    <CardWrapper>
      <h2>Card Goes Here</h2>
      <CardContainer>
        <CardImage />
        <GameName />
        <PlatformAndPrice />
      </CardContainer>
    </CardWrapper>
  );
};

export default Card;