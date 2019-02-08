import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootSaga from './sagas/index';
import rootReducer from './reducers';
import middleware, { sagaMiddleware } from './middleware';

const reducer = persistReducer(
  {
    key: 'rrsb', // key is required
    storage, // storage is now required
    whitelist: ['app', 'auth0'],
  },
  combineReducers({ ...rootReducer }),
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

global.store = store;

export { store, persistor };
