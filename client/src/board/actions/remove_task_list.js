import axios from 'axios';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';

export const removeTaskList = (id) => {
    return (dispatch) => {
        dispatch(removeTaskListStarted());
        axios
            .delete(`${ENDPOINTS_BASE_URL}TaskLists/${id}`)
            .then((res) => {
                if (res.data.count == 1) {
                    dispatch(removeTaskListSuccess(id));
                }else{
                    dispatch(removeTaskFailure("Some problem while deleting tasklist"));
                }
            })
            .catch((err) => {
                dispatch(removeTaskListFailure(err.message));
            });
    };
};

const removeTaskListStarted = () => ({
    type: types.REMOVE_TASKLIST_STARTED
});

const removeTaskListSuccess = (data) => {
    return {
        type: types.REMOVE_TASKLIST_SUCCESS,
        payload: data
    };
};

const removeTaskListFailure = (error) => ({
    type: types.REMOVE_TASKLIST_FAILURE,
    payload: {
        error
    }
});
