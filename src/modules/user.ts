import { createPromiseThunk, customPromiseThunk, handleAsyncActions, reducerUtils} from '../lib/asyncUtils';


import * as UserAPI from '../lib/api/user';


/* Action Types */

const LOGIN = 'user/LOGIN';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_ERROR = 'user/LOGIN_ERROR';


const SET_USER_INFO = 'user/SET_USER_INFO';
const SET_USER_INFO_SUCCESS = 'user/SET_USER_INFO_SUCCESS';
const SET_USER_INFO_ERROR = 'user/SET_USER_INFO_ERROR';

const AUTHORIZE = 'user/AUTHORIZE';
const AUTHORIZE_SUCCESS = 'user/AUTHORIZE';
const AUTHORIZE_ERROR = 'user/AUTHORIZE';

/* Action Creator */

export const login = createPromiseThunk(LOGIN, UserAPI.login);
export const authorize= createPromiseThunk(AUTHORIZE, UserAPI.authorize);
export const setUserInfo = customPromiseThunk(SET_USER_INFO);




/* Set initial State */ 

const initialState = {
    userInfo : reducerUtils.initial(),
    authorize: reducerUtils.initial(),
    login : reducerUtils.initial(),

};

export default function user(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
        case LOGIN_SUCCESS:
        case LOGIN_ERROR:
            return handleAsyncActions(LOGIN, 'login')(state, action);
        case SET_USER_INFO:
        case SET_USER_INFO_SUCCESS:
        case SET_USER_INFO_ERROR:
            return handleAsyncActions(SET_USER_INFO, 'userInfo')(state, action);
        case AUTHORIZE:
        case AUTHORIZE_SUCCESS:
        case AUTHORIZE_ERROR:
            return handleAsyncActions(AUTHORIZE, 'authorize')(state, action);
        default:
            return state;
    }
}