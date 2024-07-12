import { reducerCases } from "./Contants.js";

export const initialState = {
    token : null,
    playlist : [],
};


const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN:
            return {
              ...state,
              token: action.token,
            };
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state,
                playlist: action.playlist,
            };
        }
        case reducerCases.REMOVE_TOKEN:
            return {
                 ...state, token: null 
            }; 
        default:
            return state;
    }
};

export default reducer;