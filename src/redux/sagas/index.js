import { all, fork } from 'redux-saga/effects';

import dogs from './dogs';


/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(dogs),
  ]);
}
