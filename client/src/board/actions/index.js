import { getBoard } from './get_board';
import { getTasks } from './get_tasks';
import { addTask } from './add_task';
import { editTask } from './edit_task';
import { removeTask } from './remove_task';
import { getTaskList } from './get_task_list';
import { addTaskList } from './add_task_list';
import schemas from './schema';

export default {
    getBoard,
    getTasks,
    addTask,
    editTask,
    removeTask,
    getTaskList,
    addTaskList,
    schemas
};
