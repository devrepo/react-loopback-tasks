import merge from 'lodash/merge';

/**
 * The reducer to update the tasklist state when a new tasklist is updated.
 * @param {*} state - old state
 * @param {*} action - payload of the added tasklist
 */
export const addTaskList = (state, action) => {
    const newTaskLists = merge({}, state.taskLists, action.payload.taskLists);
    return {
        ...state,
        loading: false,
        taskLists: newTaskLists,
        error: null
    };
};

/**
 * The reducer to get all the tasklists in state.
 * @param {*} state - old state
 * @param {*} action - payload of the retrieved tasklists
 */
export const getTaskLists = (state, action) => {
    return {
        ...state,
        loading: false,
        ...action.payload,
        error: null
    };
};
