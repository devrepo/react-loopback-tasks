import { createSelector } from 'reselect';
import { NAME } from './constants';

//Helper function to get the board state
export const getBoard = (state) => state[NAME];

//Helper function to get the tasklists
const getTaskListState = (state) => {
    const { taskLists } = getBoard(state);
    return taskLists;
};

//Helper function to filter tasks per tasklist id given from normalized state.
const getTasksForList = (state, listId) => {
    const tasksEntries = getBoard(state).tasks;
    const taskIds = Object.keys(tasksEntries);
    const filteredTasks = taskIds.filter((taskId) => {
        return tasksEntries[taskId].taskListId === listId;
    });
    const tasks = filteredTasks.map((id) => {
        return tasksEntries[id];
    });
    return tasks;
};

//Memoized selector for tasklists
export const getTaskLists = createSelector(
    [getTaskListState],
    (taskLists) => taskLists
);

//Memoized selector for tasks
export const getTasks = createSelector([getTasksForList], (tasks) => tasks);
