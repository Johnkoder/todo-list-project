import Project from './project.js';
import promptSync from "prompt-sync";
const prompt = promptSync();


export default class projectContainer {
    projects = [];

    // displays
    displayProjects() {
        for(const project of this.projects) {
            console.log(`${project.id} - ${project.name}`);
        }
    }

    displayMenu() {
        console.log("[1] Create project");
        console.log("[2] Pick a project");
        console.log("[3] Delete project");
        console.log("[4] Exit")
    }

    // features
    createProject() {
        console.log("Enter the project name: ");
        const name = prompt("=> ").trim();
        const id = this.projects.length;
        const newProject = new Project(id, name);
        this.projects.push(newProject);
    }

    deleteProject(id) {
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].id === id) {
                this.projects.splice(i, 1);
            }
        }
    }

    pickProject(id) {
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].id === id) {
                
            }
        }
    }
}