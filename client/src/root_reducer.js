import { combineReducers } from 'redux';
import { constants as boardConstants, reducers } from './board';

export default combineReducers({
    [boardConstants.NAME]: reducers
});
