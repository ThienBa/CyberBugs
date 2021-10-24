import { GET_DATA_DRAWER_EDIT_PROJECT, GET_LIST_PROJECT, GET_PROJECT_DETAIL, GET_USER_SEARCH } from "../../constants/CyberBugs/CyberBugsConstants"
import { GET_USER_BY_PROJECT_ID } from "../../constants/CyberBugs/UserConstants"

const initialState = {
    arrListProject: [],
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "2"
    },
    userSearches: [],
    projectDetail: {},
    arrUserByProject: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_PROJECT: {
            return { ...state, arrListProject: action.data }
        }
        case GET_DATA_DRAWER_EDIT_PROJECT: {
            return { ...state, projectEdit: action.dataEdit }
        }
        case GET_USER_SEARCH: {
            return { ...state, userSearches: action.userSearches }
        }
        case GET_PROJECT_DETAIL: {
            return { ...state, projectDetail: action.projectDetail }
        }
        case GET_USER_BY_PROJECT_ID: {
            return { ...state, arrUserByProject: action.arrUserByProject }
        }
        default:
            return state
    }
}
