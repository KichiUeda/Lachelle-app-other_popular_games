import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Carousel from "./Carousel.jsx";

const AppWrapper = styled.div`
  width: 100%;
  height: 339px;
  background-color: #282c34;
`;
const AppStyled = styled.div`
  height: 269px;
  color: #a1a7b2;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []//what data will I be altering state with? cards in carousel list
    };
  }

  render() {
    return (
      <AppWrapper>
        <AppStyled>
          <h1>Testing 1, 2, 3 - Other Popular Games</h1>
          <div>
            <Carousel />
          </div>
        </AppStyled>
      </AppWrapper>
    );
  }
}

export default App;