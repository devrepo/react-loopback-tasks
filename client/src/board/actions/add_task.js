import axios from 'axios';
import { normalize } from 'normalizr';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';
import schemas from './schema';

export const addTask = ({ name, taskListId, userId }) => {
    return (dispatch) => {
        dispatch(addTaskStarted());
        axios
            .post(`${ENDPOINTS_BASE_URL}Tasks`, {
                name,
                taskListId,
                userId
            })
            .then((res) => {
                dispatch(addTaskSuccess(res.data));
            })
            .catch((err) => {
                dispatch(addTaskFailure(err.message));
            });
    };
};

const addTaskStarted = () => ({
    type: types.ADD_TASK_STARTED
});

const addTaskSuccess = (data) => {
    //const normalizedResponse = normalize(data, schemas.taskSchema);
    return {
        type: types.ADD_TASK_SUCCESS,
        payload: data
    };
};

const addTaskFailure = (error) => ({
    type: types.ADD_TASK_FAILURE,
    payload: {
        error
    }
});
