import { CLOSE_DRAWER, OPEN_DRAWER, GET_DATA_DRAWER_EDIT_PROJECT, SET_SUBMIT_DRAWER, GET_DATA_DRAWER_EDIT_USER } from "../../constants/CyberBugs/DrawerConstants"

export const openDrawerActions = (Component, title) => ({
    type: OPEN_DRAWER,
    Component,
    title
})

export const closeDrawerActions = () => ({
    type: CLOSE_DRAWER,
})

export const setSubmitDrawerActions = (submitForm) => ({
    type: SET_SUBMIT_DRAWER,
    submitForm
})

export const getDataDrawerEditProjectActions = (projectEdit) => ({
    type: GET_DATA_DRAWER_EDIT_PROJECT,
    projectEdit
})

export const getDataDrawerEditUserActions = (userEdit) => ({
    type: GET_DATA_DRAWER_EDIT_USER,
    userEdit
})