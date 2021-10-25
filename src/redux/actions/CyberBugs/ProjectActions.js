import { CREATE_PROJECT_API_SAGA, GET_LIST_PROJECT_API_SAGA, UPDATE_PROJECT_API_SAGA, DELETE_PROJECT_API_SAGA, GET_DATA_PROJECT_CATEGORY_SAGA, GET_PROJECT_DETAIL_API_SAGA } from "../../constants/CyberBugs/CyberBugsConstants";

export const createProjectApiActions = (newProject) => ({
    type: CREATE_PROJECT_API_SAGA,
    newProject,
})

export const getListProjectApiActions = () => ({
    type: GET_LIST_PROJECT_API_SAGA,
})

export const getProjectCategoryApiActions = () => ({
    type: GET_DATA_PROJECT_CATEGORY_SAGA,
})

export const updateProjectApiActions = (projectUpdate) => ({
    type: UPDATE_PROJECT_API_SAGA,
    projectUpdate
})

export const deleteProjectApiActions = (projectId) => ({
    type: DELETE_PROJECT_API_SAGA,
    projectId
})

export const getProjectDetailApiActions = (projectId) => ({
    type: GET_PROJECT_DETAIL_API_SAGA,
    projectId
})


