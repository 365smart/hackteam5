import { put, call } from 'redux-saga/effects';
// import Logger from 'js-logger';
import Api from '../../Api';
// import { MainActions } from '../actions';

export const init = function * init() {
  // yield put(MainActions.getConfig());
  // yield put(MainActions.getImages());
  // yield put(MainActions.getDrives());
  let res = yield call(Api.locationList);
  console.log("init", res)
}
