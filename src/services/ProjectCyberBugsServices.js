import { listAxiosServices } from "./ListAxiosServices"

export const ProjectCyberBugsServices = {
    getProjectCategoryApi: () => {
        return listAxiosServices.get('ProjectCategory')
    },
    createProjectApi: (newProject) => {
        return listAxiosServices.post('Project/createProject', newProject)
    },
    createProjectAuthorizationApi: (newProject) => {
        return listAxiosServices.post('Project/createProjectAuthorize', newProject)
    },
    getListProjectApi: () => {
        return listAxiosServices.get('Project/getAllProject')
    },
    updateProjectApi: (projectUpdate) => {
        return listAxiosServices.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate)
    },
    deleteProjectApi: (projectId) => {
        return listAxiosServices.delete(`Project/deleteProject?projectId=${projectId}`)
    },
    getProjectDetailApi: (projectId) => {
        return listAxiosServices.get(`Project/getProjectDetail?id=${projectId}`)
    },
}