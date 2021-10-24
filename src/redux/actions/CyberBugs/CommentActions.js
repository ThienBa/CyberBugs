import { ADD_COMMENT_API_SAGA, DELETE_COMMENT_API_SAGA, EDIT_COMMENT_API_SAGA, GET_ALL_COMMENT_API_SAGA } from '../../constants/CyberBugs/CommentConstants'

export const getAllCommentApiSagaActions = (taskId) => ({
  type: GET_ALL_COMMENT_API_SAGA,
  taskId
})

export const addCommentApiSagaActions = (taskId, contentComment) => ({
  type: ADD_COMMENT_API_SAGA,
  commentAdd: {
    "taskId": taskId,
    "contentComment": contentComment
  }
})

export const deleteCommentApiSagaActions = (taskId, idComment) => ({
  type: DELETE_COMMENT_API_SAGA,
  taskId,
  idComment
})

export const editCommentApiSagaActions = (taskId,idComment, contentComment) => ({
  type: EDIT_COMMENT_API_SAGA,
  taskId,
  idComment,
  contentComment
})
