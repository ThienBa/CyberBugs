import { ASSIGN_USER_PROJECT_API_SAGA, GET_USER_SEARCH_API_SAGA, LOGIN_USER_API, REMOVE_USER_FROM_PROJECT_API_SAGA } from "../../constants/CyberBugs/CyberBugsConstants";
import { DELETE_USER_API_SAGA, EDIT_USER_API_SAGA, GET_USERS_API_SAGA, GET_USER_BY_PROJECT_ID_API_SAGA, USER_SIGNUP_API_SAGA } from "../../constants/CyberBugs/UserConstants";

export const userLoginApiActions = (values) => ({
  type: LOGIN_USER_API,
  userLogin: {
    email: values.email,
    passWord: values.passWord
  }
})

export const getUserByProjectIdApiActions = (projectId) => ({
  type: GET_USER_BY_PROJECT_ID_API_SAGA,
  projectId
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

export const getUserSearchApiActions = (keyWord) => ({
  type: GET_USER_SEARCH_API_SAGA,
  keyWord
})

//===============================USERS===============================
export const userSignUpApiActions = (newUser) => ({
  type: USER_SIGNUP_API_SAGA,
  newUser
})

export const getUsersApiActions = (keyword = '') => ({
  type: GET_USERS_API_SAGA,
  keyword
})

export const deleteUserApiActions = (userId) => ({
  type: DELETE_USER_API_SAGA,
  userId
})

export const editUserApiActions = (userEdit) => ({
  type: EDIT_USER_API_SAGA,
  userEdit
})
