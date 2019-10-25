import React from 'react';
import styled from 'styled-components';
import {
  color,
  space,
  border,
  typography
} from 'styled-system';

const Board = styled.div`
  width: 900px;
  height: 900px;
  text-align: center;
  margin: 16px;
  margin-left: 48px;
  ${space}
  ${color}
  ${border}
  ${typography}
`;

const Square = styled.div`
  width: 300px;
  height: 300px;
  display: inline-block;
  border: 10px solid ${p => p.theme.colors.dark};
  border-radius: 8px;
  font-size: 230px;
  cursor: pointer;
  ${space}
  ${color}
  ${border}
  ${typography}
`;

export default class TicTacToeBoard extends React.Component{
  onClick(v, i) {
    console.log("onClick", v, i)
    let { canMove, onChange } = this.props;
      console.log("onClick", v, i, canMove)
    if (canMove && v === '-') {
      onChange(i);
    }
  }

  renderSquare(v, i) {
    return (
      <Square
        key={this.key++}
        bg="light"
        color="primary"
        onClick={() => this.onClick(v, i)}>
        {v}
      </Square>
    )
  }

  render() {
    this.key = 0;
    let { gameState } = this.props
    let squares = [];
    for (let i in gameState) {
      let v = gameState[i];
      squares.push(this.renderSquare(v, i));
    }
    return (
      <Board>
        {squares}
      </Board>
    )
  }
}
