import { reducerCases } from "./Contants.js";

export const initialState = {
    token : null,
    playlist : [],
    userInfor : null,
    selectionPlaylistID : "5vu60Ii5kZjRZ5hIxqwaIv",
    selectPlaylist : null,
    currentPlaying: null,
    playerState : false,
};


const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN:
            return {
              ...state,
              token: action.token,
            };
        case reducerCases.SET_PLAYLIST: 
            return {
                ...state,
                playlist: action.playlist,
            };
        case reducerCases.SET_USER:
            return {
                ...state, 
                userInfor: action.userInfor, 
            };
        case reducerCases.SET_SELECTION_PLAYLIST_ID :
            return {
                ...state,
                selectionPlaylistID : action.selectionPlaylistID,
            }
        case reducerCases.SELECT_PLAYLIST :
            return{
                ...state,
                selectPlaylist : action.selectPlaylist,
            }
        case reducerCases.SET_CURRENT_SONG:
            return{
                ...state,
                currentPlaying : action.currentPlaying,
            }

        case reducerCases.SET_PLAYER_STATE:
            return {
                ...state,
                playerState: action.playerState,
            }
        default:
            return state;
    }
};

export default reducer;