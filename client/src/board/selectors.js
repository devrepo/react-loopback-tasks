import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getBoard = (state) => state[NAME];

const getTaskListState = (state) => {
    const { taskLists } = getBoard(state);
    return taskLists;
};

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
export const getTaskLists = createSelector(
    [getTaskListState],
    (taskLists) => taskLists
);

export const getTasks = createSelector([getTasksForList], (tasks) => tasks);
