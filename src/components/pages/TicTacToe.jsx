import React from 'react';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';
import { Link } from '../elements';

class TicTacToe extends React.Component {
  render() {
    let path = this.props.location.pathname;
    let search = this.props.location.search;
    let {
      price,
      kiosk
    } = QueryString.parse(search);
    return (
      <div>
        <div>{kiosk}</div>
        <div>{price}</div>
        <Link href={`http://localhost:3000/mm?price=${price}#/`}>End Game</Link>
      </div>
    )
  }
}

export default withRouter(TicTacToe);
