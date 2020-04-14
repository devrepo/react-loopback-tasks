import { schema, arrayOf } from 'normalizr';

const taskSchema = new schema.Entity('tasks');
const tasklistSchema = new schema.Entity('taskLists', {
    tasks: [taskSchema]
});
const boardSchema = new schema.Entity('board', {
    taskLists: [tasklistSchema]
});
const schemas = { boardSchema, tasklistSchema, taskSchema };
export default schemas;
