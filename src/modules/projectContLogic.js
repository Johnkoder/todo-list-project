import Project from "./projecLogic";

export default class ProjectCont {
    #projectList = [];

    get getProjectList() { return this.#projectList }

    createProject(name) {
        const newProject = new Project(name);
        this.#projectList.push(newProject);
    }

    deleteProject(id) {
        const projectIndex = this.findProjectIndex(id);
        this.#projectList.splice(projectIndex, 1);
    }

    findProjectIndex(id) {
        console.log(id)
        for(let i = 0; i < this.#projectList.length; i++) {
            console.log(this.#projectList[i])
            if(this.#projectList[i].getId === id) {
                return i;
            }
        }

        return -1;
    }
}