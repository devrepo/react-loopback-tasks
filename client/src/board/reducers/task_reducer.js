import merge from 'lodash/merge';
import _ from 'lodash';

const removeTasksFromTaskList = (state, taskId) => {
    Object.entries(state.taskLists).map(([key, tasklist]) => {
        const { tasks } = tasklist;
        const taskIndex = tasks && tasks.indexOf(taskId);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            state.taskLists[key].tasks = tasks;
        }
    });
};

const updateTaskList = (state, action, taskId) => {
    const updatedTask = action.payload.tasks[taskId];
    const tasksInNewTaskList = state.taskLists[updatedTask.taskListId].tasks;
    tasksInNewTaskList.push(taskId);
};

export const addTask = (state, action) => {
    const newTasks = merge({}, state.tasks, action.payload.tasks);
    const taskIds = Object.keys(action.payload.tasks);
    const taskId = parseInt(taskIds[0]);
    updateTaskList(state, action, taskId);
    return {
        ...state,
        loading: false,
        tasks: newTasks,
        error: null
    };
};

export const editTask = (state, action) => {
    const newTasks = merge({}, state.tasks, action.payload.tasks);
    return {
        ...state,
        loading: false,
        tasks: newTasks,
        error: null
    };
};

export const moveTask = (state, action) => {
    const newTasks = merge({}, state.tasks, action.payload.tasks);
    const taskIds = Object.keys(action.payload.tasks);
    const taskId = parseInt(taskIds[0]);
    removeTasksFromTaskList(state, taskId);
    updateTaskList(state, action, taskId);
    return {
        ...state,
        loading: false,
        tasks: newTasks,
        error: null
    };
};

export const removeTask = (state, action) => {
    const newTasks = _.omit(state.tasks, action.payload);
    const taskId = parseInt(action.payload);
    removeTasksFromTaskList(state, taskId);
    return {
        ...state,
        loading: false,
        tasks: newTasks,
        error: null
    };
};
