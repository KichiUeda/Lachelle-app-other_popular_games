import React from 'react';
import styled from 'styled-components';

const ImageStyled = styled.div`
background-color: lightskyblue;
  width: 270px;
  height: 153.99px;
  margin: 0;
  display: flex;
  align-items: space-around;
`;

const CardImage = (props) => {
  return (
    <ImageStyled>
      <h2>image</h2>
    </ImageStyled>
  );
};

export default CardImage;