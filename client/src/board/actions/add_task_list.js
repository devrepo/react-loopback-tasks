import axios from 'axios';
import { normalize } from 'normalizr';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';
import schemas from './schema';

export const addTaskList = ({ name, boardId }) => {
    return (dispatch) => {
        dispatch(addTaskListStarted());
        axios
            .post(`${ENDPOINTS_BASE_URL}TaskLists`, {
                name,
                boardId
            })
            .then((res) => {
                dispatch(addTaskListSuccess({...res.data, tasks:[]}));
            })
            .catch((err) => {
                dispatch(addTaskListFailure(err.message));
            });
    };
};

const addTaskListStarted = () => ({
    type: types.ADD_TASKLIST_STARTED
});

const addTaskListSuccess = (data) => {
    const normalizedResponse = normalize(data, schemas.tasklistSchema);
    return {
        type: types.ADD_TASKLIST_SUCCESS,
        payload: normalizedResponse.entities
    };
};

const addTaskListFailure = (error) => ({
    type: types.ADD_TASKLIST_FAILURE,
    payload: {
        error
    }
});
