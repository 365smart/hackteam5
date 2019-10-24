import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { MainActions } from '../data/redux/actions';
import * as Pages from './pages';
import { GlobalStyles } from './elements';
// import Theme from '../theme';


const withTheme = (Component, theme) => () => {
  return (
    <ThemeProvider theme={theme}>
      <Component />
      <GlobalStyles />
    </ThemeProvider>
  )
}

class Router extends React.Component {

  componentDidMount() {
    this.props.init();
  }

  render() {
    let { theme } = this.props.main;
    // let theme = Theme.self
    let routes = [];
    // eslint-disable-next-line
    for (let page in Pages) {
      let PageComponent = Pages[page];
      routes.push(
        <Route key={page}
          path={`/${page}`}
          component={withTheme(PageComponent, theme)} />
      )
    }
    return (
      <HashRouter>
        <Switch>
          <Route exact key={1}
            path={"/"}
            component={withTheme(Pages.TicTacToe, theme)} />
          {routes}
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => {
  let { theme } = state.main
  return {
    main: { theme }
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(MainActions.init()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Router);
