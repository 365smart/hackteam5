import React from 'react';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';
import { Link, Modal, TicTacToeBoard } from '../elements';
import Api from '../../data/Api';
import styled from 'styled-components';
import {
  color,
  space,
  border,
  typography
} from 'styled-system';

const Container= styled.div`
  text-align: center;
  padding: 16px;
  padding-top:64px;
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  font-size: 28px;
  & b {
    font-size: 48px;
  }
  ${space}
  ${color}
  ${border}
  ${typography}
`;

const Label = styled.div`
  color: ${p => p.active && p.theme.colors.success};
  ${space}
  ${color}
  ${border}
  ${typography}
`;

class TicTacToe extends React.Component {
  state = {
    gameState: '---------',
    loading: true
  }

  componentDidMount() {
    this._mounted = true;
    setTimeout(this.init, 1000);
    setTimeout(this.goBack, 10000);
  }

  goBack = () => {
    if (!this._mounted) return;
    if (!this.state.loading) return;
    window.history.back();
  }

  init = () => {
    if (!this._mounted) return;
    let search = this.props.location.search;
    let {
      price,
      kiosk
    } = QueryString.parse(search);
    console.log("params", price, kiosk);
    if (!kiosk || !price) return;
    Api.popQueue(player => {
      console.log("player", player);
      if (!player || player.kiosk === kiosk) {
        Api.pushQueue(kiosk, price);
        Api.listenForGameStart(kiosk, (gameId) => {
          console.log("game started", gameId, kiosk)
          this.listen(gameId);
        })
      } else {
        console.log("starting game", kiosk);
        Api.startGame({kiosk, price}, player, this.state.gameState, this.listen);
      }
    })
  }

  listen = (gameId) => {
    let search = this.props.location.search;
    let { kiosk } = QueryString.parse(search);
    console.log("listening to gameState", gameId);
    Api.listenForGameChange(gameId, (data) => {
      const { player1, player2, gameState, turn, isX } = data;
      console.log("update gameState", gameState);
      this.setState({ loading: false, gameState, player1, player2, gameId, turn, isX });
    })
  }

  componentWillUnmount() {
    if (this.state.gameId) {
      Api.endGame(this.state.gameId);
    }
    this._mounted = false;
  }

  isP1() {
    let search = this.props.location.search;
    let { kiosk } = QueryString.parse(search);
    let { player1 } = this.state;
    return player1 && player1.kiosk === kiosk;
  }

  onMove = (i) => {
    let { gameState, isX, turn, gameId } = this.state;
    let symbol = isX ? 'X' : 'O';
    console.log("gamestate", gameState);
    let nextGameState = '';
    for (let index in gameState) {
      let char = gameState[index];
      if (index === i) char = symbol;
      nextGameState += char;
    }
    console.log("nextgamestate", nextGameState);
    turn = (turn === 'player1') ? 'player2' : 'player1';
    Api.updateGame(gameId, nextGameState, turn, !isX);
  }

  isGameOver(gameState) {
    let lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let i in lines) {
      let [a, b, c] = lines[i];
      if (gameState[a] === gameState[b] && gameState[b] == gameState[c]) {
        let char = gameState[a];
        if (char === '-') continue;
        this.winner = char;
        return true;
      }
    }
    return false;
  }

  render() {
    let search = this.props.location.search;
    let {
      price,
      kiosk
    } = QueryString.parse(search);
    let {
      loading,
      gameState,
      player1,
      player2,
      turn,
      isX
    } = this.state;
    let isP1 = this.isP1();
    if (loading) {
      return <div><Modal>Waiting for opponent...</Modal></div>
    }
    let isGameOver = this.isGameOver(gameState);
    let isMyTurn = isP1 && turn === 'player1' || !isP1 && turn === 'player2';
    let vs = isP1 ? player2.kiosk : player1.kiosk;
    let playingAsX = (isMyTurn && isX) || (!isMyTurn && !isX);
    let isWinner = (this.winner === 'X' && playingAsX) || (this.winner === 'O' && !playingAsX);

    if (isGameOver) {
      setTimeout(() => {
        let theirPrice = isP1 ? player2.price : player1.price;
        if (isWinner) {
          price = parseFloat(price) - parseFloat(theirPrice)
          if (price < 0) price = 0;
        } else {
          price = parseFloat(price) + parseFloat(theirPrice);
        }
        price = parseFloat(price).toFixed(2);
        window.location.href = `http://localhost:3000/mm?price=${price}#/`;
      }, 4000);
    }
    return (
      <Container bg="dark" color="light">
        <Label active={isMyTurn}>You: {kiosk} {playingAsX ? 'X' : 'O'}</Label>
        <Label active={!isMyTurn}>Oppenent: {vs} {playingAsX ? 'O' : 'X'}</Label>
        <TicTacToeBoard
          gameState={gameState}
          canMove={isMyTurn}
          onChange={this.onMove}/>
        <b>{isMyTurn ? 'Your Turn' : 'Opponents Turn'}</b>
          {isGameOver && (
            <Modal>{isWinner ? 'You Win!' : 'You Lose!'}</Modal>
          )}
      </Container>
    )
  }
}

export default withRouter(TicTacToe);
