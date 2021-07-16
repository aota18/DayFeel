
import { combineReducers} from 'redux';

import weather from './weather';
import user from './user';
import place from './place'

export default combineReducers({
    weather,
    user,
    place
})