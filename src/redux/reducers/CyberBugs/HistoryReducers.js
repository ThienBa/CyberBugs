import { SET_HISTORY } from "../../constants/CyberBugs/CyberBugsConstants"


/* eslint-disable import/no-anonymous-default-export */
const stateHistory = {
    history: {}
}

export default (state = stateHistory, action) => {
    switch (action.type) {
        case SET_HISTORY: {
            return { ...state, history: action.history }
        }
        default:
            return { ...state }
    }
}
