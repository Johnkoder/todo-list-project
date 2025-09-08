import Project from "./projectLogic";

export default class ProjectCont {
    #projectList = [];

    get getProjectList() { return this.#projectList }
    set setProjectList(projectList) { this.#projectList = projectList  }

    toJSON () {
        return { projectList: this.#projectList }
    }

    static fromJSON(projectCont) {
        const newProjectCont = new ProjectCont();
        newProjectCont.setProjectList = JSON.parse(projectCont).projectList;
        return newProjectCont;
    }

    loadProjectCont() {
        const projectCont = localStorage.getItem('projectCont');
        if (!projectCont) return null;  
        return ProjectCont.fromJSON(projectCont);
    }

    createProject(name) {
        const newProject = new Project(name);
        this.#projectList.push(newProject);
    }

    deleteProject(id) {
        const projectIndex = this.findProjectIndex(id);
        this.#projectList.splice(projectIndex, 1);
    }

    findProjectIndex(id) {
        for(let i = 0; i < this.#projectList.length; i++) {
            if(this.#projectList[i].getId === id) {
                return i;
            }
        }

        return -1;
    }
}