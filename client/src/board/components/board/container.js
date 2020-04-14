import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import actions from '../../actions';

import BoardUI from './ui';
import loadingImage from '../../assets/loading.gif';
import { getBoard } from '../../selectors';

const Loading = styled.img.attrs({
    src: loadingImage
})`
  width: 43px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  right: 0px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  background-color: #0d503b;
`;

const Error = styled.div`
    animation: fade-in 2s ease-in-out forwards;
    padding: 10px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    right: 0px;
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
    background-color: red;

    @keyframes fade-in {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }    
`;

class Board extends React.Component {
    componentDidMount() {
        this.props.getBoard(this.props.boardId);
    }

    render() {
        const { loading, error } = this.props;
        return (
            <span>
                <BoardUI {...this.props} />
                <Loading visible={loading} />
                <Error visible={error}>{error}</Error>
            </span>
        );
    }
}

Board.propTypes = {
    getBoard: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string
};

Board.defaultProps = {
    boardId: '1',
    loading: false
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBoard: (boardId) => {
            dispatch(actions.getBoard(boardId));
        }
    };
};

export default connect((state) => getBoard(state), mapDispatchToProps)(Board);
