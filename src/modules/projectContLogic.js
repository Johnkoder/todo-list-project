import Project from "./projectLogic";
import Todo from "./todoLogic";

export default class ProjectCont {
    #projectList = [];

    get getProjectList() { return this.#projectList }
    set setProjectList(projectList) { this.#projectList = projectList  }

    toJSON () {
        return { 
            projectList: this.#projectList.map(project => ({
                id: project.getId,
                name: project.getName,
                todoList: project.getTodoList.map(todo => ({
                    id: todo.getId,
                    title: todo.getTitle,
                    desc: todo.getDesc,
                    dueDate: todo.getDueDate,
                    priority: todo.getPriority,
                    isChecked: todo.getIsChecked
                }))
            }))
        }
    }

    static fromJSON(jsonProjectCont) {
        const newProjectCont = new ProjectCont();
        newProjectCont.setProjectList = JSON.parse(jsonProjectCont).projectList.map(project => {
            const newProject = new Project(project.name);
            newProject.setId = project.id;
            newProject.setTodoList = project.todoList.map(todo => {
                const newTodo = new Todo(todo.title, todo.desc, todo.dueDate, todo.priority);
                newTodo.setId = todo.id;
                newTodo.setIsChecked = todo.isChecked;
                return newTodo;
            })
            return newProject;
        });

        return newProjectCont;
    }

    loadProjectCont() {
        const projectCont = localStorage.getItem('projectCont');
        if (!projectCont) return null;  
        return ProjectCont.fromJSON(projectCont);
    }

    saveProjectCont() {
        localStorage.setItem('projectCont', JSON.stringify(this.toJSON()));
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