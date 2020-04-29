import axios from 'axios';

import { ENDPOINTS_BASE_URL } from '../constants';
import * as types from '../action_types';

export const removeTask = (id) => {
    return (dispatch) => {
        dispatch(removeTaskStarted());
        axios
            .delete(`${ENDPOINTS_BASE_URL}Tasks/${id}`)
            .then((res) => {
                if (res.data.count == 1) {
                    dispatch(removeTaskSuccess(id));
                }else{
                    dispatch(removeTaskFailure("Some problem while deleting task"));
                }
            })
            .catch((err) => {
                dispatch(removeTaskFailure(err.message));
            });
    };
};

const removeTaskStarted = () => ({
    type: types.REMOVE_TASK_STARTED
});

const removeTaskSuccess = (data) => {
    return {
        type: types.REMOVE_TASK_SUCCESS,
        payload: data
    };
};

const removeTaskFailure = (error) => ({
    type: types.REMOVE_TASK_FAILURE,
    payload: {
        error
    }
});
