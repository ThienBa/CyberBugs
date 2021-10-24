import { ListAxiosServices } from './ListAxiosServices'
class TaskCyberBugsServices extends ListAxiosServices {
    constructor() {
        super()
    }
    createTaskApi = (newTask) => {
        return this.post("Project/createTask", newTask)
    }
    getTaskDetailApi = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    updateStatusTaskApi = (statusTaskUpdate) => {
        return this.put('Project/updateStatus', statusTaskUpdate)
    }
    updateTaskApi = (newTask) => {
        return this.post('Project/updateTask', newTask)
    }
}
export const taskCyberBugsServices = new TaskCyberBugsServices()