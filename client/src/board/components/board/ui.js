import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import TaskLists from '../tasklist';

const BoardUI = (props) => {
    return (
        <div>
            <Header data-testid="header">Board</Header>
            <TaskLists boardId={props.boardId} />
            {props.children}
        </div>
    );
};

BoardUI.propTypes = {
    boardId: PropTypes.string.isRequired
};

BoardUI.defaultProps = {
    boardId: '1'
};

export default BoardUI;
