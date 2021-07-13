import { createPromiseThunk, handleAsyncActions, reducerUtils} from '../lib/asyncUtils';


import * as UserAPI from '../lib/api/user';


/* Action Types */

const LOGIN = 'user/LOGIN';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_ERROR = 'user/LOGIN_ERROR';




/* Action Creator */

export const login = createPromiseThunk(LOGIN, UserAPI.login);




/* Set initial State */ 

const initialState = {
    login : reducerUtils.initial(),

};

export default function user(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
        case LOGIN_SUCCESS:
        case LOGIN_ERROR:
            return handleAsyncActions(LOGIN, 'login')(state, action);
       
        default:
            return state;
    }
}