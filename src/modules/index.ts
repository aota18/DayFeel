
import { combineReducers} from 'redux';

import weather from './weather';
import user from './user';

export default combineReducers({
    weather,
    user
})