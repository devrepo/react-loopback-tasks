import { Model, many, attr } from 'redux-orm';
import * as types from '../action_types';

class Board extends Model {
    toString() {
        return `Board: ${this.name}`;
    }
    // Declare any static or instance methods you need.
}
Board.modelName = 'Board';

// Declare your related fields.
Board.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    loading: attr({getDefault : ()=> false}),
    error: attr()
};
Board.reducer = (action, Board, session) => {
    switch (action.type) {
        case types.GET_BOARD_SUCCESS: {
            const boardData = action.payload.board;
            Object.entries(boardData).map(([key, board]) => {
                Board.upsert(board)
            })
            
            const taskListsData = action.payload.taskLists;
            if (taskListsData){
                Object.entries(taskListsData).map(([key, tasklist]) => {
                    return session.TaskList.upsert(tasklist);
                });
            }
            const tasks = action.payload.tasks;
            if (tasks){
                Object.entries(tasks).map(([key, task]) => {
                    session.Task.upsert(task);
                });
            }
            
            break
        }
    }
    return session.state;
}
export default Board;