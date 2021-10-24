import { call, takeLatest, put } from 'redux-saga/effects'
import { commentCyberBugsServices } from '../../../services/CommtentCyberBugsServices'
import { STATUS_CODE } from '../../../utils/constants/settingSystem'
import { ADD_COMMENT_API_SAGA, DELETE_COMMENT_API_SAGA, EDIT_COMMENT_API_SAGA, GET_ALL_COMMENT_API_SAGA, GET_ALL_COMMENT_REDUCER } from '../../constants/CyberBugs/CommentConstants';
import Swal from 'sweetalert2';

/**
 * Nghiệp vụ get all comment
 * 23/10/2021 - Huỳnh Thiên Bá
 */
function* getAllCommentApiSaga(action) {
    try {
        const { data, status } = yield call(() => commentCyberBugsServices.getAllCommentApi(action.taskId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_REDUCER,
                arrComment: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function* followGetAllCommentApiSaga() {
    yield takeLatest(GET_ALL_COMMENT_API_SAGA, getAllCommentApiSaga)
}

/**
 * Nghiệp vụ add comment
 * 24/10/2021 - Huỳnh Thiên Bá
 */
function* addCommentApiSaga(action) {
    try {
        const { status } = yield call(() => commentCyberBugsServices.insertCommentApi(action.commentAdd))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_API_SAGA,
                taskId: action.commentAdd.taskId
            })
            Swal.fire({
                title: 'Success!',
                text: 'Add comment successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Error add comment!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}

export function* followAddCommentApiSaga() {
    yield takeLatest(ADD_COMMENT_API_SAGA, addCommentApiSaga)
}

/**
 * Nghiệp vụ delete comment
 * 24/10/2021 - Huỳnh Thiên Bá
 */
function* deleteCommentApiSaga(action) {
    try {
        const { status } = yield call(() => commentCyberBugsServices.deleteCommentApi(action.idComment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_API_SAGA,
                taskId: action.taskId
            })
            Swal.fire({
                title: 'Success!',
                text: 'Comment deleted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Error deleted comment!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}

export function* followDeleteCommentApiSaga() {
    yield takeLatest(DELETE_COMMENT_API_SAGA, deleteCommentApiSaga)
}

/**
 * Nghiệp vụ edit comment
 * 24/10/2021 - Huỳnh Thiên Bá
 */
function* editCommentApiSaga(action) {
    try {
        const { status } = yield call(() => commentCyberBugsServices.updateCommentApi(action.idComment, action.contentComment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_API_SAGA,
                taskId: action.taskId
            })
            Swal.fire({
                title: 'Success!',
                text: 'Comment updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Error update comment!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}

export function* followEditCommentApiSaga() {
    yield takeLatest(EDIT_COMMENT_API_SAGA, editCommentApiSaga)
}