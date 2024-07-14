import { reducerCases } from "./Contants.js";

export const initialState = {
    token : null,
    playlist : [],
    userInfor : null,
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
        case reducerCases.SET_USER:
            return {
                ...state, 
                userInfor: action.userInfor, 
            }; 
        default:
            return state;
    }
};

export default reducer;