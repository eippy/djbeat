//IMPORTS
import { IComment, ICommentState, IActionCreator } from "./types/comments";
import { csrfFetch } from "./csrf";

//ACTION TYPES
const GET_ALL_COMMENTS = 'comments/getAllComments'
const CREATE_A_COMMENT = 'comments/createComment'
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = ' comments/deleteComment';

//ACTION CREATORS
const getAllComments = (comments: IComment[]) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
})

const createComment = (comment: IComment) => ({
    type: CREATE_A_COMMENT,
    payload: comment
})

const updateComment = (comment: IComment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})

const deleteComment = (commentId: number) => ({
    type: DELETE_COMMENT,
    payload: commentId
})


//THUNKS
export const getAllCommentsThunk = (songId: number): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch(`/api/comments/songs/${songId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getAllComments(data))
            return data;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json())
    }
}

export const createCommentThunk = (commentData: any ): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData),
      });
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(createComment(data));
            return data;
        } else {
            throw res;
      }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
};
  
export const updateCommentThunk = (commentId: number, comment: string): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment })
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(updateComment(data));
            return data;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json())
    }
}

export const deleteCommentThunk = (commentId: number): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch(`/api/comments/${commentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"}
        })
        if (res.ok) {
            dispatch(deleteComment(commentId))
            return { success: true };
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
}

//INITIAL STATE
const initialState: ICommentState = {
    byId: {},
    allComments: []
}

//REDUCER
function commentsReducer(state = initialState, action: IActionCreator) {
    let newState;
    switch (action.type) {
        case GET_ALL_COMMENTS:
            const comments = action.payload;
            newState = { ...state }
            newState.allComments = comments;

            let newByIdGetComments: { [id: number]: IComment } = {};
            for (let comment of comments) {
                newByIdGetComments[comment.id] = comment;
            }
            newState.byId = newByIdGetComments;
            return newState;
        
        case CREATE_A_COMMENT:
            newState = { ...state };
            const newComment = action.payload
            newState.allComments = [newComment, ...newState.allComments]
            newState.byId = { ...newState.byId, [newComment.id]: newComment }
            return newState;
        
        case UPDATE_COMMENT:
            newState = { ...state };
            const updatedComment = action.payload;
            newState.allComments = newState.allComments.map(comment =>
                comment.id === updatedComment.id ? updatedComment : comment
            );
            newState.byId = { ...newState.byId, [updatedComment.id]: updatedComment };
            return newState;
        case DELETE_COMMENT:
            const commentId = action.payload
            newState = { ...state };
            newState.allComments = newState.allComments.filter(comment => comment.id !== commentId);
            newState.byId = { ...newState.byId };
            delete newState.byId[commentId];
            return newState;
        
        default:
            return state;
    }
}

export default commentsReducer;