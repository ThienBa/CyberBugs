import { GET_ALL_COMMENT_REDUCER } from "../../constants/CyberBugs/CommentConstants"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    arrComment: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENT_REDUCER: {
            return { ...state, arrComment: action.arrComment }
        }

        default:
            return { ...state }
    }
}
