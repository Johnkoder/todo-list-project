import ProjectCont from "../modules/projectContLogic";

export default class ProjectContUI {
    constructor() {
        this.logic = new ProjectCont();
        this.root = document.createElement('div');
        this.root.className = 'project-cont';

        this.root.innerHTML = `
            <div class="project-list"></div>
            <button class="add-project-btn">Add Project</button>
            <dialog class="add-project-dialog">
                
                
                <div>Project Name:</div>    
                <input class="dialog-input" type="text" required />
            
                <button class="cancel-btn">Cancel</button>
                <button class="confirm-btn">Confirm</button>
                
                
            </dialog>
        `;

        this.projectListElement = this.root.querySelector('.project-list');
        this.addProjectBtn = this.root.querySelector('.add-project-btn');

        this.dialogElement = this.root.querySelector('.add-project-dialog');
        this.dialogInput = this.dialogElement.querySelector('.dialog-input')
        this.confirmBtn = this.dialogElement.querySelector('.confirm-btn')
        this.cancelBtn = this.dialogElement.querySelector('.cancel-btn')
    
        this.bindEvents();
    }
    
    //TODO: Update and delete functionality
    build() {
        this.renderProjectList();
        return this.root;
    }

    // bind events 
    bindEvents() {
        this.handleAddProjectBtn();
        this.handleConfirmBtn();
        this.handleCanceBtn();
    }

    // listeners
    handleCanceBtn() {
        this.cancelBtn.addEventListener('click', () => {
            this.dialogInput.value = '';
            this.closeAddProjectModal();
        })
    }

    closeAddProjectModal() {
        this.dialogElement.close();
    }

    handleAddProjectBtn() {
        this.addProjectBtn.addEventListener('click', ()=> {
            this.showAddProjectModal();
        })
    }

    showAddProjectModal() {
        this.dialogElement.showModal();
    }

    handleConfirmBtn() {
        this.confirmBtn.addEventListener('click', () => {
            this.confirmBtnProcess();
        })
    }

   confirmBtnProcess() {
        const projectName = this.getProjectName();
        this.dialogInput.value = '';
        this.logic.createProject(projectName);
        this.dialogElement.close();
        this.renderProjectList();
    }

    getProjectName() {
        const projectName = this.dialogInput.value;
        return projectName;
    }
    
    renderProjectList() {
        this.removeChildren();
        const projectList = this.logic.getProjectList;
        projectList.forEach(project => {
            this.projectListElement.append(this.createProjectElement(project));
        })
        
    }

    createProjectElement(project) {
        const projectElement = document.createElement('div');
        projectElement.innerHTML = `
            <span>${project.getName}</span>
            <button class="project-update-btn">Update</button>
            <button class="project-delete-btn">Delete</button>
        `;

        this.handleProjectUpdateBtn(projectElement, project);
        this.handleProjectDeleteBtn(projectElement, project);
        return projectElement;
    }

    handleProjectUpdateBtn(projectElement, project) {
        this.projectUpdateBtn = projectElement.querySelector('.project-update-btn');
        this.projectUpdateBtn?.addEventListener('click', () => {
            this.updateProjectBtnProcess(project);
            this.renderProjectList();
        })
    }

    updateProjectBtnProcess(project) {
        // Implement this.
        console.log(project.getName)
    }

    handleProjectDeleteBtn(projectElement, project) {
        this.projectDeleteBtn = projectElement.querySelector('.project-delete-btn');
        this.projectDeleteBtn?.addEventListener('click', () => {
            this.deleteProjectBtnProcess(project);
            this.renderProjectList();
        })
    }

    deleteProjectBtnProcess(project) {
        this.logic.deleteProject(project.getId)
    }

    removeChildren() {
        while (this.projectListElement.firstChild) {
            this.projectListElement.removeChild(this.projectListElement.lastChild);
        }
    }
}

