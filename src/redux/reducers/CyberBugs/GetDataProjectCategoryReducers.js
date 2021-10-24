import { GET_DATA_PROJECT_CATEGORY } from "../../constants/CyberBugs/CyberBugsConstants"
const initialState = {
    arrProjectCategory: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_PROJECT_CATEGORY: {
            return { ...state, arrProjectCategory: action.data }
        }
        default:
            return { ...state }
    }
}
