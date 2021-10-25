import React from "react";
import { OPEN_DRAWER, CLOSE_DRAWER, SET_SUBMIT_DRAWER_CREATE_TASK, SET_SUBMIT_DRAWER, GET_DATA_DRAWER_EDIT_PROJECT, GET_DATA_DRAWER_EDIT_USER } from '../../constants/CyberBugs/DrawerConstants'

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    visible: false,
    title: "",
    Component: <p>Default content</p>,
    handleSubmitEditForm: (props) => { alert('OKOKOKOKKOKK') },
    projectEdit: {},
    userEdit: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, visible: true, Component: action.Component, title: action.title };
        case CLOSE_DRAWER:
            return { ...state, visible: false };
        case SET_SUBMIT_DRAWER:
            return { ...state, handleSubmitEditForm: action.submitForm }
        case GET_DATA_DRAWER_EDIT_PROJECT:
            return { ...state, projectEdit: action.projectEdit }
        case GET_DATA_DRAWER_EDIT_USER:
            return { ...state, userEdit: action.userEdit }
        default:
            return {...state}
    }
};
