import { CLOSE_DRAWER_EDIT_PROJECT, CREATE_PROJECT_API_SAGA, GET_DATA_DRAWER_EDIT_PROJECT, GET_LIST_PROJECT_API_SAGA, OPEN_DRAWER_EDIT_PROJECT, SET_SUBMIT_DRAWER_EDIT_PROJECT, UPDATE_PROJECT_API_SAGA, DELETE_PROJECT_API_SAGA, GET_USER_SEARCH_API_SAGA, ASSIGN_USER_PROJECT_API_SAGA, GET_DATA_PROJECT_CATEGORY_SAGA, REMOVE_USER_FROM_PROJECT_API_SAGA, GET_PROJECT_DETAIL_API_SAGA, OPEN_DRAWER_ADD_TASK, SET_SUBMIT_DRAWER_CREATE_TASK } from "../../constants/CyberBugs/CyberBugsConstants";

export const createProjectApiActions = (newProject) => ({
    type: CREATE_PROJECT_API_SAGA,
    newProject,
})

export const getListProjectApiActions = () => ({
    type: GET_LIST_PROJECT_API_SAGA,
})

export const openDrawerEditProjectActions = (Component, title) => ({
    type: OPEN_DRAWER_EDIT_PROJECT,
    Component,
    title
})

export const openDrawerAddTaskActions = (Component, title) => ({
    type: OPEN_DRAWER_ADD_TASK,
    Component,
    title
})

export const closeDrawerEditProjectActions = () => ({
    type: CLOSE_DRAWER_EDIT_PROJECT,
})

export const setSubmitDrawerEditProjectActions = (submitFormEdit) => ({
    type: SET_SUBMIT_DRAWER_EDIT_PROJECT,
    submitFormEdit
})
export const setSubmitDrawerCreateTaskActions = (submitFormCreateTask) => ({
    type: SET_SUBMIT_DRAWER_CREATE_TASK,
    submitFormCreateTask
})

export const getDataDrawerEditProjectActions = (dataEdit) => ({
    type: GET_DATA_DRAWER_EDIT_PROJECT,
    dataEdit
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

export const getUserSearchApiActions = (keyWord) => ({
    type: GET_USER_SEARCH_API_SAGA,
    keyWord
})

export const assignUserProjectActions = (projectId, userId) => ({
    type: ASSIGN_USER_PROJECT_API_SAGA,
    userProject: {
        "projectId": projectId,
        "userId": userId
    }
})

export const removeUserFromProjectActions = (projectId, userId) => ({
    type: REMOVE_USER_FROM_PROJECT_API_SAGA,
    userProject: {
        "projectId": projectId,
        "userId": userId
    }
})

export const getProjectDetailApiActions = (projectId) => ({
    type: GET_PROJECT_DETAIL_API_SAGA,
    projectId
})


