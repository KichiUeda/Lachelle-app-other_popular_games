import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Carousel from "./Carousel.jsx";

const AppWrapper = styled.div`
  width: 100%;
  height: 375.53px;
  background-color: #282c34;
`;
const AppStyled = styled.div`
  height: 305.53px;
  color: #a1a7b2;
`;



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AppWrapper>
        <AppStyled>
          {/* <AppTitle>Other Popular Games Today</AppTitle> */}
          <Carousel />
        </AppStyled>
      </AppWrapper>
    );
  }
}

export default App;