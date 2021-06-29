import { createPromiseThunk, handleAsyncActions, reducerUtils} from '../lib/asyncUtils';


import * as WeatherAPI from '../lib/api/weather';


/* Action Types */

const GET_WEATHER_INFO = 'weather/GET_WEATHER_INFO';
const GET_WEATHER_INFO_SUCCESS = 'weather/GET_WEATHER_INFO_SUCCESS';
const GET_WEATHER_INFO_ERROR = 'weather/GET_WEATHER_INFO_ERROR';




/* Action Creator */

export const getWeatherInfo = createPromiseThunk(GET_WEATHER_INFO, WeatherAPI.getWeatherInfo);




/* Set initial State */ 

const initialState = {
    getWeatherInfo : reducerUtils.initial(),

};

export default function weather(state = initialState, action) {
    switch(action.type) {
        case GET_WEATHER_INFO:
        case GET_WEATHER_INFO_SUCCESS:
        case GET_WEATHER_INFO_ERROR:
            return handleAsyncActions(GET_WEATHER_INFO, 'getWeatherInfo')(state, action);
       
        default:
            return state;
    }
}