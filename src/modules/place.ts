import { createPromiseThunk, handleAsyncActions, reducerUtils, customPromiseThunk} from '../lib/asyncUtils';


import * as PlaceAPI from '../lib/api/place';


/* Action Types */

export const SET_PLACES = 'place/SET_PLACES'
export const SET_PLACES_SUCCESS = 'place/SET_PLACES_SUCCESS'
export const SET_PLACES_ERROR = 'place/SET_PLACES_ERROR'

export const ADD_PLACE = 'place/ADD_PLACE'
export const ADD_PLACE_SUCCESS = 'place/ADD_PLACE_SUCCESS'
export const ADD_PLACE_ERROR = 'place/ADD_PLACE_ERROR'

export const GET_PLACES = 'place/GET_PLACES';
export const GET_PLACES_SUCCESS = 'place/GET_PLACES_SUCCESS';
export const GET_PLACES_ERROR = 'place/GET_PLACES_ERROR';

export const SEARCH_PLACE = 'place/SEARCH_PLACE';
export const SEARCH_PLACE_SUCCESS = 'place/SEARCH_PLACE_SUCCESS';
export const SEARCH_PLACE_ERROR = 'place/SEARCH_PLACE_ERROR';




/* Action Creator */
export const setPlaces = customPromiseThunk(SET_PLACES);
export const addPlace = createPromiseThunk(ADD_PLACE, PlaceAPI.addPlace);
export const getPlaces = createPromiseThunk(GET_PLACES, PlaceAPI.getPlaces);
export const searchPlace = createPromiseThunk(SEARCH_PLACE, PlaceAPI.searchPlace);






/* Set initial State */ 

const initialState = {
    places: reducerUtils.initial(),
    addPlace: reducerUtils.initial(),
    getPlaces: reducerUtils.initial(),
    searchPlace: reducerUtils.initial()

};


/* Reducer */
export default function place(state = initialState, action) {
    switch(action.type) {
        case ADD_PLACE:
        case ADD_PLACE_SUCCESS:
        case ADD_PLACE_ERROR:
            return handleAsyncActions(ADD_PLACE, 'addPlace')(state, action);
        case GET_PLACES:
        case GET_PLACES_SUCCESS:
        case GET_PLACES_ERROR:
            return handleAsyncActions(GET_PLACES, 'getPlaces')(state, action);
        case SEARCH_PLACE:
        case SEARCH_PLACE_SUCCESS:
        case SEARCH_PLACE_ERROR:
            return handleAsyncActions(SEARCH_PLACE, 'searchPlace')(state, action);
        case SET_PLACES:
        case SET_PLACES_SUCCESS:
        case SET_PLACES_ERROR:
            return handleAsyncActions(SET_PLACES, 'places')(state, action)
        default:
            return state;
    }
}