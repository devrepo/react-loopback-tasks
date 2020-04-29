import axios from 'axios';
import { normalize } from 'normalizr';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';
import schemas from './schema';

export const getTaskList = (boardId) => {
    return (dispatch) => {
        dispatch(getTaskListsStarted());
        axios
            .get(`${ENDPOINTS_BASE_URL}TaskLists`, {
                params: {
                    filter: { where: { boardId } }
                }
            })
            .then((res) => {
                const manipulatedData = {taskLists: res.data};
                dispatch(getTaskListsSuccess(manipulatedData));
            })
            .catch((err) => {
                dispatch(getTaskListsFailure(err.message));
            });
    };
};

const getTaskListsStarted = () => ({
    type: types.GET_TASKLISTS_STARTED
});

const getTaskListsSuccess = (data) => {
    const normalizedResponse = normalize(data, { "taskLists": [schemas.tasklistSchema]} );
    console.log("normalized tl", normalizedResponse);
    return {
        type: types.GET_TASKLISTS_SUCCESS,
        payload: normalizedResponse.entities
    };
};

const getTaskListsFailure = (error) => ({
    type: types.GET_TASKLISTS_FAILURE,
    payload: {
        error
    }
});
