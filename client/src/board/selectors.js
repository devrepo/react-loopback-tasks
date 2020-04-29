import { createSelector } from 'redux-orm';
import orm from './models';

const Board = createSelector(orm.Board);
const TaskList = createSelector(orm.TaskList);
const Task = createSelector(orm.Task)

export const getBoard = (state) => {
    const board = Board(state, 1);
    return board || {}
}
export const getTaskLists = (state) => {
    const taskLists = TaskList(state);
    return taskLists || [];
}
export const getTasks = (state, taskListId) => {
    const tasks = Task(state);
    const filteredTasks = tasks.filter(task => 
        {
            return task.taskListId == taskListId
        })
    return filteredTasks || [];
}