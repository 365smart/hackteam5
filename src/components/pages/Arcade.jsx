import React from 'react';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';
import styled from 'styled-components';
import {
  color,
  space,
  border,
  typography
} from 'styled-system';
import { Link, Button } from '../elements';

const Container= styled.div`
  text-align: center;
  padding-top:64px;
  font-size: 48px;
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  ${space}
  ${color}
  ${border}
  ${typography}
`;



const Cols= styled.div`
  ${space}
  ${color}
  ${border}
  ${typography}
`;

const Last= styled.div`
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  margin-bottom: 32px;
  text-align: center;
  ${space}
  ${color}
  ${border}
  ${typography}
`;


class Arcade extends React.Component {

  render() {
    let search = this.props.location.search;
    let {
      price,
      kiosk
    } = QueryString.parse(search);
    return (
      <Container bg="dark" color="light">
        <h1>Select a Game</h1>
        <Cols>
          <Link to={`/Platformer?price=${price}&kiosk=${kiosk}`}>
            <Button p="lg" fontSize="xl">365 Snack Attack</Button>
          </Link>
          <Link to={`/TicTacToe?price=${price}&kiosk=${kiosk}`}>
            <Button p="lg" fontSize="xl">Tic Tac Toe</Button>
          </Link>
        </Cols>
        <Last>
          <Link href={`http://localhost:3000/mm`}>
            <Button p="lg" fontSize="xl" bg="danger">Cancel</Button>
          </Link>
        </Last>
      </Container>
    )
  }
}

export default withRouter(Arcade);
