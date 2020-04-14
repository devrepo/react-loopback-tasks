import axios from 'axios';
import { normalize } from 'normalizr';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';
import schemas from './schema';

export const getTasks = (listId) => {
    return (dispatch) => {
        dispatch(getTasksStarted());
        axios
            .get(`${ENDPOINTS_BASE_URL}Tasks`, {
                params: {
                    filter: { where: { listId } }
                }
            })
            .then((res) => {
                dispatch(getTasksSuccess(res.data));
            })
            .catch((err) => {
                dispatch(getTasksFailure(err.message));
            });
    };
};

const getTasksStarted = () => ({
    type: types.GET_TASKS_STARTED
});

const getTasksSuccess = (data) => {
    const normalizedResponse = normalize(data, schemas.taskSchema);
    return {
        type: types.GET_TASKS_SUCCESS,
        payload: normalizedResponse.entities
    };
};

const getTasksFailure = (error) => ({
    type: types.GET_TASKS_FAILURE,
    payload: {
        error
    }
});
