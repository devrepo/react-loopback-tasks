import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TextInput, GreenButton } from '../common';

const Container = styled.div`
  background: #e6eaec;
  border-radius: 3px;
  padding: 5px;
  width: 300px;
  margin: 0 4px;
  min-width: 300px;
  margin: 5px;
  height: auto;
  max-height: 100px;
`;

class AddTaskList extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e) {
        if (e.keyCode == 13) {
            this.handleClick(e);
        }
    }

    handleClick(e) {
        this.props.onAddTaskList(this.inputRef.current.value);
        this.inputRef.current.value = '';
    }

    render() {
        return (
            <Container>
                <TextInput
                    data-testid="addTaskListInput"
                    ref={this.inputRef}
                    placeholder="Enter list title..."
                    onKeyUp={this.handleKeyUp}
                />
                <GreenButton data-testid="addTaskListButton" onClick={this.handleClick}>
          Add TaskList
                </GreenButton>
            </Container>
        );
    }
}

AddTaskList.propTypes = {
    onAddTaskList: PropTypes.func.isRequired
};

export default AddTaskList;
