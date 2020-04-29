import axios from 'axios';
import { normalize } from 'normalizr';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';
import schemas from './schema';

export const editTask = ({ name, id, taskListId }) => {
    return (dispatch) => {
        dispatch(editTaskStarted());
        const params = { id };
        if (name) params.name = name;
        if (taskListId) params.taskListId = taskListId;
        axios
            .patch(`${ENDPOINTS_BASE_URL}Tasks/${id}`, params)
            .then((res) => {
                if (params.name) {
                    dispatch(editTaskSuccess(res.data));
                } else {
                    dispatch(moveTaskSuccess(res.data));
                }
            })
            .catch((err) => {
                dispatch(editTaskFailure(err.message));
            });
    };
};

const editTaskStarted = () => ({
    type: types.UPDATE_TASK_STARTED
});

const editTaskSuccess = (data) => {
    //const normalizedResponse = normalize(data, schemas.taskSchema);
    return {
        type: types.UPDATE_TASK_SUCCESS,
        payload: data
    };
};

const moveTaskSuccess = (data) => {
    const normalizedResponse = normalize(data, schemas.taskSchema);
    return {
        type: types.MOVE_TASK_SUCCESS,
        payload: data
    };
};

const editTaskFailure = (error) => ({
    type: types.UPDATE_TASK_FAILURE,
    payload: {
        error
    }
});
