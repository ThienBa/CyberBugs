import { LOGIN_USER_API } from "../../constants/CyberBugs/CyberBugsConstants";
import { GET_USER_BY_PROJECT_ID_API_SAGA } from "../../constants/CyberBugs/UserConstants";


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
