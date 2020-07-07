import React from 'react';
import styled from 'styled-components';

const ImageStyled = styled.div`
  background-color:  #ffffff;
  height: 168px;
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
`;

const CardImage = (props) => {
  return (
    <ImageStyled>
      <h2> image goes here </h2>
    </ImageStyled>
  );
};

export default CardImage;