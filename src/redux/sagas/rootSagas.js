import { all } from "@redux-saga/core/effects";
import * as UserCyberBugsSaga from "./CyberBugs/UserCyberBugsSaga";
import * as GetDataCategoryCyberBugsSaga from "./CyberBugs/GetDataProjectCategorySaga";
import * as ProjectCyberBugsSaga from "./CyberBugs/ProjectCyberBugsSaga";
import * as PriorityCyberBugsSaga from "./CyberBugs/PriorityCyberBugsSaga";
import * as TaskTypeCyberBugsSaga from "./CyberBugs/TaskTypeCyberBugsSaga";
import * as TaskCyberBugsSaga from "./CyberBugs/TaskCyberBugsSaga";
import * as StatusCyberBugsSaga from "./CyberBugs/StatusCyberBugsSaga";
import * as CommentCyberBugsSaga from "./CyberBugs/CommentCyberBugsSaga";


export function* rootSagas() {
    yield all([
        // Major CyberBugs Saga
        UserCyberBugsSaga.followLoginUserApi(),
        UserCyberBugsSaga.followGetUserSearchApi(),
        UserCyberBugsSaga.followAssignUserProjectApi(),
        UserCyberBugsSaga.followRemoveUserFromProjectApi(),
        UserCyberBugsSaga.followGetUserByProjectIdApiSaga(),
        //=============================================USERS=============================================
        UserCyberBugsSaga.followUserSigUpApiSaga(),
        UserCyberBugsSaga.followGetUsersApiSaga(),
        UserCyberBugsSaga.followDeleteUserApiSaga(),
        UserCyberBugsSaga.followEditUserApiSaga(),

        ProjectCyberBugsSaga.followcreateProjectApi(),
        ProjectCyberBugsSaga.followGetListProjectApi(),
        ProjectCyberBugsSaga.followUpdateProjectApi(),
        ProjectCyberBugsSaga.followDeleteProjectApi(),
        ProjectCyberBugsSaga.followGetProjectDetailApi(),

        TaskCyberBugsSaga.followCreateTaskApiSagaTask(),
        TaskCyberBugsSaga.followGetTaskDetailApiSaga(),
        TaskCyberBugsSaga.followUpdateStatusTaskApiSaga(),
        TaskCyberBugsSaga.followUpdateChangTaskApiSaga(),

        //=============================================COMMENTS=============================================
        CommentCyberBugsSaga.followGetAllCommentApiSaga(),
        CommentCyberBugsSaga.followAddCommentApiSaga(),
        CommentCyberBugsSaga.followDeleteCommentApiSaga(),
        CommentCyberBugsSaga.followEditCommentApiSaga(),

        TaskTypeCyberBugsSaga.followGetAllTaskTypeApiSaga(),
        StatusCyberBugsSaga.followGetAllStatusApiSaga(),
        PriorityCyberBugsSaga.followGetAllPriorityApiSaga(),
        GetDataCategoryCyberBugsSaga.followGetDataProjectCategoryApi(),
    ])
}