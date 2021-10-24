import { GET_ALL_STATUS } from "../../constants/CyberBugs/StatusConstants";

const initialState = {
    arrStatus: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_STATUS: {
            return { ...state, arrStatus: action.arrStatus }
        }
        default:
            return state
    }
};
