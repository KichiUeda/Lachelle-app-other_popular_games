import React from "react";
import styled from 'styled-components';
import Card from "./Card.jsx";

const CardWrapper = styled.div`
  display: block;
  width: 100vw;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-right: 5vw;
  margin-left: 5vw;
  margin-bottom: 10vh;
`;


var leftArrow = {
  'width': '0',
  'height': '0',
  'borderTop': '50px solid transparent',
  'borderRight': '100px solid grey',
  'borderBottom': '50px solid transparent'
}

var rightArrow = {
  'width': '0',
  'height': '0',
  'borderTop': '50px solid transparent',
  'borderLeft': '100px solid grey',
  'borderBottom': '50px solid transparent'
}

const Carousel = (props) => {
  return (
    <div className='container'>
      <div className='carousel-container' style={carouselContainerStyle}>
        <div className='arrow-left' style={leftArrow}></div>
        <CardWrapper>
          <CardContainer>
            <Card />
            <Card />
            <Card />
            <Card />
          </CardContainer>
        </CardWrapper>
        <div className='arrow-right' style={rightArrow}></div>
      </div>
    </div>
  );
};

export default Carousel;


