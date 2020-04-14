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

/**
 * Reducer to update state in case of task is added
 * There is a need to update the tasklist state as well when
 * a new task is added
 * @param {*} state - old state
 * @param {*} action - contains payload of new task added
*/
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

/**
 * Reducer to update state with the edited task.
 * @param {*} state - old state
 * @param {*} action - contains payload of updated tasks
 */
export const editTask = (state, action) => {
    const newTasks = merge({}, state.tasks, action.payload.tasks);
    return {
        ...state,
        loading: false,
        tasks: newTasks,
        error: null
    };
};

/**
 * When user performs a drag and drop operation, the task has to be
 * moved from one tasklist to another tasklist.
 * In that case, only the 'taskListId' of the task is updated.
 * But the normalized tasklists also have to be updated - the old one to get rid
 * of the task id moved to another tasklist and the new tasklist where the
 * task is dropped to.
 * @param {*} state - old state
 * @param {*} action - contains payload of updated tasks
 */
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

/**
 * The state has to be updated to remove the task from task state.
 * Also, the tasklist have to be updated to remove the deleted task id
 * @param {*} state - old state
 * @param {*} action - contains id of the removed task
 */
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
