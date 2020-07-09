import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Card from "./Card.jsx";

const CardWrapper = styled.div`
  display: block;
  width: 100vw;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-right: 5vw;
  margin-left: 5vw;
  margin-bottom: 10vh;
`;

const Arrow = styled.div`
  width: 17;
  height: 122;
  display:flex;
  align-items: center;
  .fas {
    color: #949699;
    font-size: 50px;
  }
  &:hover .fas{
    color: #d2d5d9;
  }
  `;

const Carousel = (props) => {
  return (
    <CardWrapper>
      <Arrow><i className='fas fa-angle-left'></i></Arrow>
      <CardContainer>
        <Card />
        <Card />
        <Card />
        <Card />
      </CardContainer>
      <Arrow><i className='fas fa-angle-right'></i></Arrow>
    </CardWrapper>
  );
};

export default Carousel;


