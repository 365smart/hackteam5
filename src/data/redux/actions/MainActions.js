// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Theme from '../../../theme';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // <actionName>:[<arg1>,...,<argN>] --> function actionName(arg1,..., argN)
  init: [],
  setTheme: ['theme']
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  theme: Theme.self,
})

/* ------------- Reducers ------------- */
const init = (state, { config }) => INITIAL_STATE;
const putObject = (state, object) => Object.assign({}, state, object);

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: init,
  [Types.SET_THEME]: putObject
})
