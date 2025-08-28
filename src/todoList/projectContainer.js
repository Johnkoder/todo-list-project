import Project from './project.js';

export default class ProjectContainer {
    #projectList = [];

    // features
    get projectList() { return this.#projectList; }

    createProject(projectName) {
        const id = this.#projectList.length;
        const newProject = new Project(id, projectName);
        this.#projectList.push(newProject);
    }

    deleteProject(id) {
        for(let i = 0; i < this.#projectList.length; i++) {
            if(this.#projectList[i].id === id) {
                this.#projectList.splice(i, 1);
            }
        }
    }

    findProject(id) {
        for(let i = 0; i < this.#projectList.length; i++) {
            if(this.#projectList[i].id === id) {
                return this.#projectList[i];
            }
        }
    }
}