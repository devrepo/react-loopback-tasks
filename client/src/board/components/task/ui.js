import React from 'react';
import styled from 'styled-components';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';

import pencilImage from '../../assets/icon-pencil.png';
import AddTask from './add_task';

const Item = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  min-height: 41px;
  max-height: 100%;
  position: relative;
  white-space: normal;
  margin: 5px;
  cursor: pointer;
  color: #172b4d;
  padding: 10px;
  border: 1px solid;
  justify-content: space-between;
`;

const Edit = styled.div`
  background-image: url(${pencilImage});
  background-repeat: no-repeat;
  width: 16px;
  min-width: 16px;
  height: 16px;
  margin-right: 5px;
  margin-top: 1px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

Edit.propTypes = {
    visible: PropTypes.bool
};
Edit.defaultProps = {
    visible: false
};

const Close = styled.div`
  &:after {
    content: '\\d7';
  }
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

Close.propTypes = {
    visible: PropTypes.bool
};
Close.defaultProps = {
    visible: false
};

const ModalHeader = styled.div`
  color: #172b4d;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  background-color: #00000026;
`;

const StyledModal = styled(Modal)`
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
`;

const TaskName = styled.div`
  flex-grow: 1;
`;

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveTask = this.handleRemoveTask.bind(this);
        this.showEditClose = this.showEditClose.bind(this);
        this.hideEditClose = this.hideEditClose.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleEditDialogClose = this.handleEditDialogClose.bind(this);
        this.state = {
            showIcons: false,
            isEditDialogOpen: false
        };
    }

    showEditClose(e) {
        this.setState({
            showIcons: true
        });
    }

    hideEditClose(e) {
        this.setState({
            showIcons: false
        });
    }

    handleRemoveTask(e) {
        this.props.onRemoveTask(this.props.id);
    }

    handleEditTask(e) {
        this.setState({
            showIcons: false
        });
        this.setState({ isEditDialogOpen: true });
    }

    handleEditDialogClose(taskDetails) {
        this.setState({ isEditDialogOpen: false });
        if (taskDetails && taskDetails.name) {
            taskDetails.id = this.props.id;
            this.props.onEditTask(taskDetails);
        }
    }

    render() {
        const { showIcons } = this.state;
        const { name, innerRef, provided } = this.props;

        return (
            <Item
                ref={innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onMouseEnter={this.showEditClose}
                onMouseLeave={this.hideEditClose}
            >
                <TaskName>{name}</TaskName>
                <Edit visible={showIcons} onClick={this.handleEditTask} />
                <StyledModal
                    visible={this.state.isEditDialogOpen}
                    effect="fadeInUp"
                    onClickAway={this.handleEditDialogClose}
                    width="300"
                    height="145"
                >
                    <ModalHeader>Card Details</ModalHeader>
                    <AddTask
                        placeholder="Enter new title here..."
                        currentValue={name}
                        onAddTask={this.handleEditDialogClose}
                    />
                </StyledModal>

                <Close onClick={this.handleRemoveTask} visible={showIcons} />
            </Item>
        );
    }
}

TaskItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    innerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ]),
    onRemoveTask: PropTypes.func,
    onEditTask: PropTypes.func,
    provided: PropTypes.object
};

export default TaskItem;
