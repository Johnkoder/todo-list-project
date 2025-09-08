import ProjectCont from "../modules/projectContLogic";
import ProjectUI from "./projectUI.js";
import '../styles/projectCont.css';
import addIconUrl from '../icons/add.svg';
import updateIconUrl from '../icons/update.svg';
import deleteIconUrl from '../icons/delete.svg';


export default class ProjectContUI {
    constructor() {
        this.logic = new ProjectCont();
        this.root = document.createElement('div');
        this.root.className = 'project-cont';

        this.root.innerHTML = `
            <h2>Projects</h2>
            <div class="project-list"></div>
            <img class="big-icon add-project-btn" src="${addIconUrl}">
            
            <dialog class="add-project-dialog">
                
                
                <div>Project Name:</div>    
                <input class="dialog-input" type="text" required />
            
                <button class="cancel-btn">Cancel</button>
                <button class="confirm-btn">Confirm</button>
                
                
            </dialog>

            <div class="todos-cont"></div>
        `;

        this.projectListElement = this.root.querySelector('.project-list');
        this.addProjectBtn = this.root.querySelector('.add-project-btn');

        this.dialogElement = this.root.querySelector('.add-project-dialog');
        this.dialogInput = this.dialogElement.querySelector('.dialog-input')
        this.confirmBtn = this.dialogElement.querySelector('.confirm-btn')
        this.cancelBtn = this.dialogElement.querySelector('.cancel-btn');

        this.todosCont = this.root.querySelector('.todos-cont');
    
        this.bindEvents();
    }
    
    build() {
        //TODO: load projectList from localStorage
        // Replace this.logic with the projectCont loaded from storage
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

        //TODO: save projectCont to localStorage
        localStorage.setItem('projectList', JSON.stringify(this.logic.toJSON()))

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
        projectElement.className = "project-item";
        projectElement.id = project.getId;
        projectElement.innerHTML = `
            <span class="project-name">${project.getName}</span>

            <img class="small-icon project-update-btn" src="${updateIconUrl}">
            <img class="small-icon project-delete-btn" src="${deleteIconUrl}">

            <dialog class="update-project-dialog">
                
                
                <div>Project Name:</div>    
                <input class="update-dialog-input" type="text" required />
            
                <button class="update-cancel-btn">Cancel</button>
                <button class="update-confirm-btn">Confirm</button>
                
            </dialog>
        `;

        this.handleProjectUpdateBtn(projectElement, project);
        this.handleProjectDeleteBtn(projectElement, project);
        this.handleProjectElement(projectElement, project);
        return projectElement;
    }

    handleProjectElement(projectElement, project) {
        const projectName = projectElement.querySelector('.project-name')
        projectName?.addEventListener('click', ()=> {
            this.projectElementProcess(project);
        })
    }

    projectElementProcess(project) {
        this.todosCont.replaceChildren();
        const projectUI = new ProjectUI(project);
        this.todosCont.append(projectUI.build());
    }

    handleProjectUpdateBtn(projectElement, project) {
        const projectUpdateBtn = projectElement.querySelector('.project-update-btn');
        projectUpdateBtn?.addEventListener('click', () => {
            this.showUpdateProjectModal(projectElement);
            
            this.handleUpdateConfirmBtn(projectElement);
            this.handleUpdateCancelBtn(projectElement);
        })
    }

    handleUpdateConfirmBtn(projectElement) {
        const projectUpdateConfirmBtn = projectElement.querySelector('.update-confirm-btn');
        projectUpdateConfirmBtn.addEventListener('click', ()=> {
            this.updateConfirmBtnProcess(projectElement);
        })
    }

    updateConfirmBtnProcess(projectElement) {
        const  updateProjectModal = projectElement.querySelector('.update-project-dialog');
        const updateDialogInput = projectElement.querySelector('.update-dialog-input');
        const projectIndex = this.logic.findProjectIndex(projectElement.id);
        const chosenProject = this.logic.getProjectList[projectIndex];
        chosenProject.setName = updateDialogInput.value;
        updateProjectModal.close();
        this.renderProjectList();
    }

    handleUpdateCancelBtn(projectElement) {
        const projectUpdateCancelBtn = projectElement.querySelector('.update-cancel-btn')
        projectUpdateCancelBtn.addEventListener('click', ()=> {
            this.closeUpdateProjectModal(projectElement);
        })
    }

    showUpdateProjectModal(projectElement) {
        const updateProjectModal = projectElement.querySelector('.update-project-dialog');
        updateProjectModal.showModal();
    }

    closeUpdateProjectModal(projectElement) {
        const updateProjectModal = projectElement.querySelector('.update-project-dialog');
        const updateDialogInput = projectElement.querySelector('.update-dialog-input')
        updateDialogInput.value = '';
        updateProjectModal.close();
    }

    handleProjectDeleteBtn(projectElement, project) {
        const projectDeleteBtn = projectElement.querySelector('.project-delete-btn');
        projectDeleteBtn?.addEventListener('click', () => {
            this.deleteProjectBtnProcess(project);
            this.todosCont.replaceChildren();
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

