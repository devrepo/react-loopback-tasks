import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './header';
import Tasks from '../task';

const Item = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  min-width: 300px;
  margin: 5px;
`;

const Close = styled.div`
  &:after {
    content: '\\d7';
  }`;

const TaskListItem = (props) => {
    const { id, name, onDelete, ...elementProps } = props;
    return (
        <Item data-testid="taskListItem">
            <Header>{name}
            <Close onClick={()=>onDelete(id)}/>
            </Header>
            <Tasks {...elementProps} taskListId={id} />
        </Item>
    );
};

TaskListItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TaskListItem;
