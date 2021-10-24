import { GET_TASK_DETAIL, HANDLE_CHANGE_TASK, HANDLE_CHANGE_SELECT_USER_ASSIGN, HANDLE_DELETE_USER_ASSIGN } from "../../constants/CyberBugs/TaskConstants";

const initialState = {
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 331,
                "avatar": "https://ui-avatars.com/api/?name=Anh Nhat",
                "name": "Anh Nhat",
                "alias": "anh-nhat"
            },
            {
                "id": 305,
                "avatar": "https://ui-avatars.com/api/?name=HungNgyuen",
                "name": "HungNgyuen",
                "alias": "hung"
            }
        ],
        "lstComment": [],
        "taskId": 1382,
        "taskName": "Task Name Name",
        "alias": "task-name-name",
        "description": "<p>Desc</p>",
        "statusId": "1",
        "originalEstimate": 5,
        "timeTrackingSpent": 10,
        "timeTrackingRemaining": 10,
        "typeId": 1,
        "priorityId": 1,
        "projectId": 1644
    },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: action.taskDetailModal }
        }
        case HANDLE_CHANGE_TASK: {
            const { name, value } = action;
            return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } }
        }
        case HANDLE_CHANGE_SELECT_USER_ASSIGN: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userAssign]
            return { ...state }
        }
        case HANDLE_DELETE_USER_ASSIGN: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(item => item.id !== action.idUserAssign.idUserAssign)]
            return { ...state }
        }
        default:
            return { ...state }
    }
}
