import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'

import { Types } from '../reducers/dogs'
//https://dog.ceo/dog-api/documentation/random
const axiosRequest = axios.create({
    baseURL: `https://dog.ceo/api/`,
    timeout: 10000,
  });

export function* fetchRandomDog({ query }) {
    try {
        const response = yield call(
            axiosRequest.get,
            `breeds/image/random`
        );
        
        yield put({
            type: Types.FETCH_SUCCESS,
            data: [response.data.message] ,
        });
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: Types.FETCH_ERROR,
            payload: err,
        });
    }
}


export default function* root() {
    yield all([
        takeEvery(Types.FETCH_REQUEST, fetchRandomDog),
    ]);
}
