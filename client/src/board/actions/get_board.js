import axios from 'axios';
import { normalize } from 'normalizr';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';
import schemas from './schema';

export const getBoard = (boardId) => {
    return (dispatch) => {
        dispatch(getBoardStarted());
        axios
            .get(`${ENDPOINTS_BASE_URL}Boards/${boardId}`, {
                params: {
                    filter: {
                        include: { relation: 'taskLists', scope: { include: 'tasks' } }
                    }
                }
            })
            .then((res) => {
                dispatch(getBoardSuccess(res.data));
            })
            .catch((err) => {
                dispatch(getBoardFailure(err.message));
            });
    };
};

const getBoardStarted = () => ({
    type: types.GET_BOARD_STARTED
});

const getBoardSuccess = (data) => {
    const normalizedResponse = normalize(data, schemas.boardSchema);
    console.log("Normalized Board", normalizedResponse);
    return {
        type: types.GET_BOARD_SUCCESS,
        payload: normalizedResponse.entities
    };
};

const getBoardFailure = (error) => ({
    type: types.GET_BOARD_FAILURE,
    payload: {
        error
    }
});
