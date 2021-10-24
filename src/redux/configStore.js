import { applyMiddleware, combineReducers, createStore } from "redux";
import LoadingReducers from "./reducers/LoadingReducers";
import HistoryReducers from "./reducers/CyberBugs/HistoryReducers"
import ReduxThunk from 'redux-thunk';

// Middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSagas } from "./sagas/rootSagas"
import { UserLoginCyberBugsReducer } from "./reducers/CyberBugs/UserLoginCyberBugsReducer";
import GetDataProjectCategoryReducers from "./reducers/CyberBugs/GetDataProjectCategoryReducers";
import ProjectCyberBugsReducers from "./reducers/CyberBugs/ProjectCyberBugsReducers";
import DrawerEditProjectReducers from "./reducers/CyberBugs/DrawerEditProjectReducers";
import PriorityReducers from "./reducers/CyberBugs/PriorityReducers";
import TaskTypeReducers from "./reducers/CyberBugs/TaskTypeReducers";
import StatusReducers from "./reducers/CyberBugs/StatusReducers";
import TaskReducers from "./reducers/CyberBugs/TaskReducers";
import CommentReducers from "./reducers/CyberBugs/CommentReducers";
const middlewareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducers,
    HistoryReducers,
    UserLoginCyberBugsReducer,
    GetDataProjectCategoryReducers,
    ProjectCyberBugsReducers,
    DrawerEditProjectReducers,
    PriorityReducers,
    TaskTypeReducers,
    StatusReducers,
    TaskReducers,
    CommentReducers
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, middlewareSaga));

middlewareSaga.run(rootSagas);

export default store;
