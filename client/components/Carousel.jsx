import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Card from "./Card.jsx";


const CardWrapper = styled.div`
  display: block;
  width: 100vw;
`;
const AppTitle = styled.h2`
  margin-bottom: 15px;
  color: ##a1a7b2;
  text-indent: 3em;
  white-space: normal;
  text-transform: uppercase;
  font-family: 'Sofia Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 5vw;
  margin-left: 5vw;
  margin-bottom: 5vh;
`;

const Arrow = styled.div`
  width: 17;
  height: 122;
  display:flex;
  align-items: center;
  .fas {
    color: #949699;
    font-size: 40px;
  }
  &:hover .fas{
    color: #d2d5d9;
  }
  `;

const Carousel = (props) => {
  let cards = props.values.slice(0,4);
  console.log('Carousel props.values array: ', cards);
  return (
    <CardWrapper>
      <br></br>
      <AppTitle>Other Popular Games Today</AppTitle>
      <CardContainer>
        <Arrow><i className='fas fa-angle-left fa-3'></i></Arrow>
          {
            cards.map((value, index) =>
              <Card
              values={value}
              key={index} />
            )
          }
        <Arrow><i className='fas fa-angle-right fa-3'></i></Arrow>
      </CardContainer>
    </CardWrapper>
  );
};

export default Carousel;


