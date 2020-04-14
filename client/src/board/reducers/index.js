import * as types from '../action_types';
import * as taskListReducers from './tasklist_reducer';
import * as boardReducer from './board_reducer';
import * as taskReducer from './task_reducer';

// Initial state of the application.
const initialState = {
    loading: false,
    board: {},
    taskLists: {},
    tasks: {},
    error: null
};

// action types
const {
    ADD_TASKLIST_STARTED,
    ADD_TASKLIST_SUCCESS,
    ADD_TASKLIST_FAILURE,
    GET_TASKLISTS_STARTED,
    GET_TASKLISTS_SUCCESS,
    GET_TASKLISTS_FAILURE,
    GET_BOARD_STARTED,
    GET_BOARD_SUCCESS,
    GET_BOARD_FAILURE,

    ADD_TASK_STARTED,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    UPDATE_TASK_STARTED,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    MOVE_TASK_SUCCESS,
    REMOVE_TASK_STARTED,
    REMOVE_TASK_SUCCESS,
    REMOVE_TASK_FAILURE
} = types;

// Helper function to avoid switch cases and running the reducers
const createReducer = (initState, handlers) => {
    return function reducer(state = initState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
};

// Global handler for all the asynchronous actions to start loading
const startLoading = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

// Global handler to report all errors
const reportError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.payload.error
    };
};

// actual mapping the reducers to the respective slice reducers.
export default createReducer(initialState, {
    [ADD_TASKLIST_STARTED]: startLoading,
    [ADD_TASKLIST_SUCCESS]: taskListReducers.addTaskList,
    [ADD_TASKLIST_FAILURE]: reportError,

    [GET_TASKLISTS_STARTED]: startLoading,
    [GET_TASKLISTS_SUCCESS]: taskListReducers.getTaskLists,
    [GET_TASKLISTS_FAILURE]: reportError,

    [GET_BOARD_STARTED]: startLoading,
    [GET_BOARD_SUCCESS]: boardReducer.getBoard,
    [GET_BOARD_FAILURE]: reportError,

    [ADD_TASK_STARTED]: startLoading,
    [ADD_TASK_SUCCESS]: taskReducer.addTask,
    [ADD_TASK_FAILURE]: reportError,

    [UPDATE_TASK_STARTED]: startLoading,
    [UPDATE_TASK_SUCCESS]: taskReducer.editTask,
    [UPDATE_TASK_FAILURE]: reportError,
    [MOVE_TASK_SUCCESS]: taskReducer.moveTask,

    [REMOVE_TASK_STARTED]: startLoading,
    [REMOVE_TASK_SUCCESS]: taskReducer.removeTask,
    [REMOVE_TASK_FAILURE]: reportError
});
