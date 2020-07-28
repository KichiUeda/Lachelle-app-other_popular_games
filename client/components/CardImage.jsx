import React from 'react';
import styled from 'styled-components';

const CardImageStyled = styled.div`
  background-color: lightskyblue;
  width: 270px;
  height: 153.99px;
  margin: 0;
  display: flex;
  align-items: space-around;
`;

const CardImage = (props) => {
  return (
    <CardImageStyled>
      <img src={props.image} width="100%" height="153.99px"></img>
    </CardImageStyled>
  );
};

export default CardImage;