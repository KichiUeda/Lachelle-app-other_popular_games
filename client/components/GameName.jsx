import React from 'react';
import styled from 'styled-components';

const GameNameContainer = styled.div`
  height: 21.54px;
  padding: 10px;
`;

const GameNameStyled = styled.h2`
  margin: 0;
`;

const GameName = (props) => {
  return (
    <GameNameContainer>
      <GameNameStyled>Game Name</GameNameStyled>
    </GameNameContainer>
  );
};

export default GameName;