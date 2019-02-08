import { createActions, createReducer } from 'reduxsauce'
import immutable from 'immutability-helper';
// import { createSelector } from 'reselect'

import { STATUS } from '../../constants/index';

export const INITIAL_STATE = {
		data: [],
		status: STATUS.IDLE,
		message: '',
};


export const { Types, Creators } = createActions({
    fetchRequest: ['query'],
    fetchSuccess: ['data'],
    fetchError: ['payload'],
}, {
    prefix: 'DOGS_'
})

/**
 * --------------- SELECTORS ---------------
 */

export const getDogs = state => state.dogs.data

/**
 * --------------- REDUCERS ---------------
 */

export const fetchRequest = (state = INITIAL_STATE, action) => immutable(state, {
    message: { $set: '' },
    status: { $set: STATUS.RUNNING },
});

export const fetchSuccess = (state = INITIAL_STATE, action) => {
    return immutable(state, {
        data: { $push: action.data },
        status: { $set: STATUS.SUCCESS },
    })
}

export const fetchError = (state = INITIAL_STATE, action) => {
    return immutable({
        message: { $set: action.payload.message },
        status: { $set: STATUS.ERROR },
    })
}


/**
 * --------------- CREATE REDUCERS ---------------
 */

export const HANDLERS = {
    [Types.FETCH_REQUEST]: fetchRequest,
    [Types.FETCH_SUCCESS]: fetchSuccess,
    [Types.FETCH_ERROR]: fetchError,
}

export default createReducer(INITIAL_STATE, HANDLERS)