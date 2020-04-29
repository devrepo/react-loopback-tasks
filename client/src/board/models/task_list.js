import { Model, fk, many, attr } from 'redux-orm';
import * as types from '../action_types';

class TaskList extends Model {
    toString() {
        return `TaskList: ${this.name}`;
    }
    // Declare any static or instance methods you need.
}
TaskList.modelName = 'TaskList';

// Declare your related fields.
TaskList.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    board: fk('Board', 'taskLists')
};
//

TaskList.reducer = (action, TaskList, session) => {
    switch (action.type) {
        case types.GET_TASKLISTS_SUCCESS: {
            Object.entries(action.payload.taskLists).map(([key, tasklist]) => {
                TaskList.upsert(tasklist);
            });
            break
        }
        case types.ADD_TASKLIST_SUCCESS: {
            Object.entries(action.payload.taskLists).map(([key, tasklist]) => {
                TaskList.upsert(tasklist);
            });
            break
        }
        case types.REMOVE_TASKLIST_SUCCESS: {
            const taskListId = action.payload;
            const taskList = TaskList.withId(taskListId);
            if (taskList) taskList.delete();
            break;
        }
    }
}

export default TaskList;