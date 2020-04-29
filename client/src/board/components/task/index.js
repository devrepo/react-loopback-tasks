import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import actions from '../../actions';
import { getTasks } from '../../selectors';
import TaskItem from './ui';
import AddTask from './add_task';

class Tasks extends React.Component {

    componentDidMount() {
        //this.props.getTasks(this.props.taskListId);
    }

    render() {
        const { tasks, onAddTask, onEditTask, onRemoveTask } = this.props;
        return (
            <div data-testid="taskWrapper">
                {tasks.map( (task, index) => {
                    const key = task.id;
                    return (
                        <Draggable key={key} draggableId={task.id.toString()} index={index}>
                            {(provided) => (
                                <TaskItem
                                    key={key}
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    id={task.id}
                                    name={task.name}
                                    taskListId={task.taskListId}
                                    onEditTask={onEditTask}
                                    onRemoveTask={onRemoveTask}
                                />
                            )}
                        </Draggable>
                    );
                })}
                <AddTask
                    clearInput
                    onAddTask={onAddTask}
                    placeholder="Enter a title for this card..."
                />
            </div>
        );
    }
}

Tasks.propTypes = {
    tasks: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onAddTask: PropTypes.func,
    onEditTask: PropTypes.func,
    onRemoveTask: PropTypes.func
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: (taskDetails) => {
            dispatch(
                actions.addTask({ ...taskDetails, taskListId: props.taskListId })
            );
        },

        onEditTask: (taskDetails) => {
            dispatch(actions.editTask(taskDetails));
        },

        onRemoveTask: (id) => {
            dispatch(actions.removeTask(id));
        },

        getTasks: (taskListId) => {
            dispatch(actions.getTasks(taskListId));
        }
    };
};

const mapStateToProps = (state, props) => {
    return {
        tasks: getTasks(state, props.taskListId)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
