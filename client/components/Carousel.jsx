import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Card from './Card.jsx';

const CarouselCardWrapper = styled.div`
  display: flex;
  width: 1140px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;

const AppTitle = styled.div`
  margin: 0 0 25px 0;
  padding: 0;
  color: ##a1a7b2;
  text-transform: uppercase;
  font-family: 'Sofia Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Carousel = (props) => {

  let cards = props.values.slice(0, 4);
  console.log('Carousel props.values array: ', cards);
  return (
    <CarouselCardWrapper className='OPG-carousel-wrapper'>
      <AppTitle className='OPG-app-title'>Other Popular Games Today</AppTitle>
      <CardContainer className='OPG-carousel-card-container'>
        {
          cards.map((value, index) =>
            <Card
              values={value}
              key={index} />
          )
        }
      </CardContainer>
    </CarouselCardWrapper>
  );
};

export default Carousel;


