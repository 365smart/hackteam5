import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { MainTypes } from '../actions/MainActions'

/* ------------- Sagas ------------- */

import * as MainSagas from './MainSagas'


/* ------------- Connect Types To Sagas ------------- */

const root = function * root () {
  yield all([
    // Main sagas
    takeLatest(MainTypes.INIT, MainSagas.init),
  ])
}

export default root;
