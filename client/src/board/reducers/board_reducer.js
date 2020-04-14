import * as types from '../action_types';

//Simple sliced reducer to get the board state
export const getBoard = (state, action) => {
    return {
        ...state,
        loading: false,
        ...action.payload,
        error: null
    };
};
