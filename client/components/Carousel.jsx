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

const Arrows = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  .arrows {
    color: #949699;
    font-size: 35px;
  }
  &:hover .arrows {
    color: #d2d5d9;
  }
  `;

const Carousel = (props) => {
  //here we receive many cards, each with their own data -- we select 4 and map them each to a given card
  let cards = props.values.slice(0,4);
  console.log('Carousel props.values array: ', cards);
  return (
    <CardWrapper>
      <br></br>
      <AppTitle>Other Popular Games Today</AppTitle>
      <CardContainer>
        <Arrows><i className='fas fa-angle-left fa-3'></i></Arrows>
          {
            cards.map((value, index) =>
              <Card
              values={value}
              key={index} />
            )
          }
        <Arrows><i className='fas fa-angle-right fa-3'></i></Arrows>
      </CardContainer>
    </CardWrapper>
  );
};

export default Carousel;


