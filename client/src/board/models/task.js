import { Model, fk, attr } from 'redux-orm';
import * as types from '../action_types';
import _ from 'lodash';

class Task extends Model {
    toString() {
        return `Task: ${this.name}`;
    }
    // Declare any static or instance methods you need.
}
Task.modelName = 'Task';

// Declare your related fields.
Task.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    status: attr({getDefault: () => 1}),
    taskList: fk('TaskList', 'tasks')
};

Task.reducer = (action, Task, session) => {
    switch (action.type) {
        case types.GET_TASKS_SUCCESS : {
            if (!action.payload.tasks) break;
            Object.entries(action.payload.tasks).map(([key, task]) => {
                Task.create(task);
            });
            break
        }
        case types.ADD_TASK_SUCCESS : {
            Task.create(action.payload)
            break;
        }
        case types.UPDATE_TASK_SUCCESS : {
            Task.withId(action.payload.id).update(action.payload);
            break;
        }
        case types.MOVE_TASK_SUCCESS : {
            const task = action.payload;
            //update old tasklist from where it moved
            const currentTaskListId = session.Task.withId(task.id).taskListId
            const currentTaskList = session.TaskList.withId(currentTaskListId);
            console.log("Tasks in current", currentTaskList.tasks.filter(task.id));
            currentTaskList.tasks.filter(task.id).delete();
            //const currentTaskListData = currentTaskList.ref;
            //const taskIndex = currentTaskListData.tasks.indexOf(task.id);
            //currentTaskListData.tasks.splice(taskIndex, 1);
            //currentTaskList.update(currentTaskListData);

            //update new tasklist to add it
            const newTaskList = session.TaskList.withId(task.taskListId);
            /**
             * TODO: To reorder the tasks as per their display index 
             * */ 
            const newTaskListData = newTaskList.ref;
            newTaskListData.tasks.push(task.id);
            newTaskListData.tasks.sort();
            newTaskList.update(newTaskListData);

            //Now update the task itself
            session.Task.withId(task.id).update(task);
            break;
        }
    }
}

export default Task;