import { ORM } from 'redux-orm';
import {NAME} from '../constants';
import Board from './board';
import Task from './task';
import TaskList from './task_list';

const orm = new ORM({
    stateSelector: state => state[NAME],
})
orm.register(Board, Task, TaskList);
export default orm;