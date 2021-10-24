import { ListAxiosServices } from "./ListAxiosServices";

class TaskTypeCyberBugsServices extends ListAxiosServices {
    constructor() {
        super();
    }
    getAllTaskTypeApi = () => {
        return this.get('TaskType/getAll')
    }
}

export const taskTypeCyberBugsServices = new TaskTypeCyberBugsServices();