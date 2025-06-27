//IMPORTS

import { ISong, ISongState, IActionCreator } from './types/songs';
import { csrfFetch } from './csrf';


//ACTION TYPES
const CREATE_A_SONG = 'songs/createSong';
const GET_ALL_SONGS = 'songs/getAllSongs';
const GET_SONG_DETAILS = 'songs/getSongDetails'
const UPDATE_SONG = 'songs/updateSong'
const DELETE_SONG = 'songs/deleteSong'

//ACTION CREATORS
const getAllSongs = (songs: ISong[]) => ({
    type: GET_ALL_SONGS,
    payload: songs
})
const getSongDetails = (song: ISong) => ({
    type: GET_SONG_DETAILS,
    payload: song
})
const createSong = (song: ISong) => ({
    type: CREATE_A_SONG,
    payload: song
})
const updateSong = (song: ISong) => ({
    type: UPDATE_SONG,
    payload: song
})

const deleteSong = (songId: number) => ({
    type: DELETE_SONG,
    payload: songId
})
//THUNKS
export const getAllSongsThunk = (): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch('/api/songs');
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getAllSongs(data));
            return data;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json())
    }
}

export const getSongDetailsThunk = (songId: number): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch(`/api/songs/${songId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getSongDetails(data));
            return data;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json())
    }
}

export const createSongThunk = (song: any): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch("/api/songs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(createSong(data));
            return data;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json());
    }
};
export const updateSongThunk = (songId: number, song: FormData | any): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch(`/api/songs/${songId}`, {
            method: "PUT",
             headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song) 
        })
        if (res.ok) {
            const data: ISong = await res.json();
            dispatch(updateSong(data))
            return data
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json());
    }
}

export const deleteSongThunk = (songId: number): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch(`/api/songs/${songId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        if (res.ok) {
            dispatch(deleteSong(songId))
            return { success: true}
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
}
//INTIAL STATE
const initialState: ISongState = {
    byId: {},
    allSongs: [],
    currentSong: null
};

//REDUCER

function songsReducer(state = initialState, action: IActionCreator) {
    let newState;
    switch (action.type) {
        case GET_ALL_SONGS:
            const songs = action.payload
            newState = { ...state };
            newState.allSongs = songs;

            let newByIdGetAllSongs: { [id: number]: ISong } = {};
            for (let song of songs) {
                newByIdGetAllSongs[song.id] = song
            }
            newState.byId = newByIdGetAllSongs;
            return newState;
        
        case GET_SONG_DETAILS:
            newState = { ...state };
            newState.currentSong = action.payload;
            newState.byId[action.payload.id] = action.payload;
            return newState;
        
        case CREATE_A_SONG:
            newState = { ...state };
            newState.allSongs = [...newState.allSongs, action.payload]
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload }
            return newState;
        
        case UPDATE_SONG:
            newState = { ...state };
            newState.allSongs = newState.allSongs.map(song =>
                song.id === action.payload.id ? action.payload : song
            );
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };
            if (newState.currentSong && newState.currentSong.id === action.payload.id) {
                newState.currentSong = action.payload;
            }
            return newState;
        
        case DELETE_SONG:
            newState = { ...state }
            newState.allSongs = state.allSongs.filter((song) => song.id !== action.payload);
            newState.byId = { ...state.byId };
            delete newState.byId[action.payload];
            return newState;
        
        default:
            return state;
    }
}


export default songsReducer