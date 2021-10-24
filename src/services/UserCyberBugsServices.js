import { ListAxiosServices } from "./ListAxiosServices";

class UserCyberBugsServices extends ListAxiosServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    userLoginApi = (userLogin) => {
        return this.post('Users/signin', userLogin)
    }
    getUserSearchApi = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }
    assignUserProjectApi = (userProject) => {
        return this.post('Project/assignUserProject', userProject)
    }
    removeUserFromProjectApi = (userProject) => {
        return this.post('Project/removeUserFromProject', userProject)
    }
    getUserByProjectIdApi = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }
}

export const userCyberBugsServices = new UserCyberBugsServices()