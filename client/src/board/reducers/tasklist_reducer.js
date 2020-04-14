import merge from 'lodash/merge';

export const addTaskList = (state, action) => {
    const newTaskLists = merge({}, state.taskLists, action.payload.taskLists);
    return {
        ...state,
        loading: false,
        taskLists: newTaskLists,
        error: null
    };
};

export const getTaskLists = (state, action) => {
    return {
        ...state,
        loading: false,
        ...action.payload,
        error: null
    };
};
