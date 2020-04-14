import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GreenButton } from '../common';

const Container = styled.div`
  padding: 5px;
`;

const TaskComposerTA = styled.textarea`
  background: none;
  border: none;
  box-shadow: none;
  margin-bottom: 4px;
  max-height: 162px;
  min-height: 54px;
  overflow: hidden;
  overflow-wrap: break-word;
  padding: 0;
  resize: none;
  height: 54px;
  padding: 6px 8px 2px;
  width: 100%;
  display: block;
  box-shadow: inset 0px 0px 4px 0px #2a2a2a4f;
  transition: margin 85ms ease-in, background 85ms ease-in;
  background-color: #dfdfdf;
  color: #6e6e6e;
`;

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        const { currentValue } = this.props;
        this.state = {
            newTaskName: currentValue || ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    sanitize(str) {
        return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\r\n]+/gm, '');
    }

    handleChange(e) {
        const newName = this.sanitize(e.target.value);
        this.setState({
            newTaskName: newName
        });
    }

    handleKeyUp(e) {
        if (e.keyCode == 13) {
            this.handleAddTask(e);
        }
    }

    handleAddTask(e) {
        const { newTaskName } = this.state;
        const { onAddTask, clearInput } = this.props;
        if (newTaskName != '') {
            onAddTask({ name: newTaskName.trim() });
            clearInput && this.setState({ newTaskName: '' });
        }
    }

    render() {
        const { placeholder } = this.props;
        return (
            <Container>
                <TaskComposerTA
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    value={this.state.newTaskName}
                    data-testid="addTaskInput"
                />
                <GreenButton onClick={this.handleAddTask} data-testid="addTaskButton">
          Add Card
                </GreenButton>
            </Container>
        );
    }
}

AddTask.propTypes = {
    currentValue: PropTypes.string,
    onAddTask: PropTypes.func.isRequired,
    clearInput: PropTypes.bool,
    placeholder: PropTypes.string.isRequired
};

AddTask.defaultProps = {
    clearInput: true,
    placeholder: 'Enter value here...'
};

export default AddTask;
