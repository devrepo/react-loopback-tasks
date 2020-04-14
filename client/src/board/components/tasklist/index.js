import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { MAX_TASK_LIST } from '../../constants';
import actions from '../../actions';
import { getTaskLists } from '../../selectors';
import TaskListItem from './ui';
import AddTaskList from './add-tasklist';

const TaskListWrapper = styled.div`
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  vertical-align: top;
  white-space: nowrap;
  list-style: none;
  margin: 5px;
`;

class TaskLists extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTaskList = this.handleAddTaskList.bind(this);
    }

    handleAddTaskList(taskListName) {
        this.props.onAddTaskList({
            name: taskListName,
            boardId: this.props.boardId
        });
    }

  onDragEnd = (result) => {
      const { source, destination } = result;
      if (!destination) {
          return;
      }
      if (source.droppableId !== destination.droppableId) {
          const { taskLists, moveTask } = this.props;
          const sourceTaskList = taskLists[source.droppableId];
          const taskId = sourceTaskList.tasks[source.index];
          moveTask({ id: taskId, taskListId: destination.droppableId });
      }
  };

  render() {
      const { taskLists } = this.props;

      return (
          <DragDropContext onDragEnd={this.onDragEnd}>
              <TaskListWrapper data-testid="taskListWrapper">
                  {Object.entries(taskLists).map(([key, taskList], index) => {
                      return (
                          <Droppable droppableId={key} key={key}>
                              {(provided) => (
                                  <div ref={provided.innerRef}>
                                      <TaskListItem {...taskList} />
                                      {provided.placeholder}
                                  </div>
                              )}
                          </Droppable>
                      );
                  })}
                  {taskLists && Object.keys(taskLists).length < MAX_TASK_LIST && (
                      <AddTaskList
                          data-testid="addTaskList"
                          onAddTaskList={this.handleAddTaskList}
                      />
                  )}
              </TaskListWrapper>
          </DragDropContext>
      );
  }
}

TaskLists.propTypes = {
    boardId: PropTypes.string.isRequired,
    taskLists: PropTypes.object.isRequired,
    onAddTaskList: PropTypes.func,
    moveTask: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTaskList: (listDetails, boardId) => {
            dispatch(actions.addTaskList(listDetails, boardId));
        },
        getTaskLists: (boardId) => {
            dispatch(actions.getTaskList(boardId));
        },
        moveTask: (taskDetails) => {
            dispatch(actions.editTask(taskDetails));
        }
    };
};

const mapStateToProps = (state, props) => {
    return {
        taskLists: getTaskLists(state, props.boardId)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskLists);
