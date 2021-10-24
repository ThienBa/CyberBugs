import { CREATE_TASK_API_SAGA, GET_TASK_DETAIL_API_SAGA, HANDLE_CHANGE_SELECT_USER_ASSIGN, HANDLE_CHANGE_TASK, HANDLE_DELETE_USER_ASSIGN, UPDATE_CHANGE_TASK_API_SAGA, UPDATE_STATUS_TASK_API_SAGA, UPDATE_TASK_API_SAGA } from "../../constants/CyberBugs/TaskConstants";

export const createTaskApiActions = (newTask) => ({
  type: CREATE_TASK_API_SAGA,
  newTask
})

export const getTaskDetailApiActions = (taskId) => ({
  type: GET_TASK_DETAIL_API_SAGA,
  taskId
})

export const updateStatusTasApiActions = (taskId, statusId, projectId) => ({
  type: UPDATE_STATUS_TASK_API_SAGA,
  statusTaskUpdate: {
    taskId,
    statusId
  },
  projectId
})

export const handleChangeTaskActions = (name, value) => ({
  type: UPDATE_CHANGE_TASK_API_SAGA,
  actionType: HANDLE_CHANGE_TASK,
  name,
  value
})

export const handleChangeSelectUserAssignActions = (userAssign) => ({
  type: UPDATE_CHANGE_TASK_API_SAGA,
  actionType: HANDLE_CHANGE_SELECT_USER_ASSIGN,
  userAssign
})

export const handleDeleteUserAssignActions = (idUserAssign) => ({
  type: UPDATE_CHANGE_TASK_API_SAGA,
  actionType: HANDLE_DELETE_USER_ASSIGN,
  idUserAssign
})
