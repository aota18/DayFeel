
import { combineReducers} from 'redux';

import weather from './weather';
import user from './user';
import place from './place'
import { persistReducer } from 'redux-persist';
import CapacitorStorage from 'redux-persist-capacitor-storage';
import storage from 'redux-persist/lib/storage';


const userPersistConfig = {
    key: 'root', 
    storage,
    whitelist:['login']
}

const rootReducer = combineReducers({
    weather,
    user : persistReducer(userPersistConfig, user),
    place
})

  
export default rootReducer