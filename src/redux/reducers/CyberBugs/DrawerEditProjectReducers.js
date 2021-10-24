import React from "react";
import { CLOSE_DRAWER_EDIT_PROJECT, OPEN_DRAWER_ADD_TASK, OPEN_DRAWER_EDIT_PROJECT, SET_SUBMIT_DRAWER_CREATE_TASK, SET_SUBMIT_DRAWER_EDIT_PROJECT } from "../../constants/CyberBugs/CyberBugsConstants";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    visible: false,
    title: "",
    Component: <p>Default content</p>,
    handleSubmitEditForm: (props) => { alert('OKOKOKOKKOKK') }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER_EDIT_PROJECT: {
            return { ...state, visible: true, Component: action.Component, title: action.title };
        }
        case CLOSE_DRAWER_EDIT_PROJECT:
            return { ...state, visible: false };
        case SET_SUBMIT_DRAWER_EDIT_PROJECT: {
            return { ...state, handleSubmitEditForm: action.submitFormEdit }
        }
        case SET_SUBMIT_DRAWER_CREATE_TASK: {
            return { ...state, handleSubmitEditForm: action.submitFormCreateTask }
        }
        case OPEN_DRAWER_ADD_TASK: {
            return { ...state, visible: true, Component: action.Component, title: action.title };
        }
        default:
            return state
    }
};
