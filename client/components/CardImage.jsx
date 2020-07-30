import React from 'react';
import styled from 'styled-components';

const CardImageStyled = styled.image`
  background-color: lightskyblue;
  width: 270px;
  height: 153.99px;
  margin: 0;
  display: flex;
  align-items: space-around;
`;


const CardImage = (props) => {
  return (
    <CardImageStyled className='OPG-carousel-card-container-card-image-styled'>
      <img src={props.image} width="100%" height="153.99px"></img>
    </CardImageStyled>
  );
};

export default CardImage;