import * as types from '../action_types';

export const getBoard = (state, action) => {
    return {
        ...state,
        loading: false,
        ...action.payload,
        error: null
    };
};
