import ProjectContainer from "../todoList/projectContainer.js";
import projectUI from "./projectUI.js";

export default class ProjectContainerUI {
    constructor() {
        this.root = document.createElement('div');
        this.projectContainer = new ProjectContainer();
    }

    render() {
        this.root.appendChild(renderProjects());
        return this.root;
    }

    renderProjects() {
        const projectList = this.projectContainer.projectList;
        const projectListElement = document.createElement('div');

        projectList.forEach(project => {
            const projectDiv = document.createElement('div');
            const deleteBtn = document.createElement('button');
            projectDiv.textContent = project.name;
            deleteBtn.textContent = "delete";
            projectDiv.appendChild(deleteBtn);
            projectDiv.dataset.id = project.id;
            
            deleteBtn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                this.projectContainer.deleteProject(id);
            })
            projectDiv.addEventListener('click', () => {
                 const id = e.target.dataset.id;
                 const chosenProject = this.projectContainer.findProject(id);
                 // TODO:
                 this.root.appendChild(chosenProject.render());
            })

            projectListElement.appendChild(projectDiv);
        });

        const addProjectsBtn = document.createElement('button');
        addProjectsBtn.textContent = 'Add Project';
        addProjectsBtn.addEventListener('click', () => {
            const projectName = this.renderAddProjectModal(projectListElement);
            this.projectContainer.createProject(projectName);
            this.render();
        })

        projectListElement.appendChild(addProjectsBtn);

        return projectListElement;
    }

    renderAddProjectModal(projectListElement) {
        const addProjectModalElement = document.createElement('div');

        const title = document.createElement('h2');
        const inputElement = document.createElement('input');
        const submitBtn = document.createElement('button');
        let projectName;

        title.textContent = "Enter Project name:";
        submitBtn.textContent = "submit";

        submitBtn.addEventListener('click', () => {
            projectName = inputElement.value;
        })

        projectListElement.appendChild(addProjectModalElement);

        return projectName;
    }
}

