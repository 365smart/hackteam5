import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  main: require('./actions/MainActions').reducer
})

/* ------------- Redux Configuration ------------- */

const middleware = []
const enhancers = []

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2,
};

/* ------------- Persist Middleware ------------- */

const pReducer = persistReducer(persistConfig, rootReducer);

/* ------------- Saga Middleware ------------- */

const sagaMiddleware = createSagaMiddleware({ })
middleware.push(sagaMiddleware)


/* ------------- Assemble Middleware ------------- */

enhancers.push(applyMiddleware(...middleware))
const store = createStore(pReducer, compose(...enhancers))
const persistor = persistStore(store);

// kick off root saga
sagaMiddleware.run(rootSaga)

export {
  store,
  persistor
}
