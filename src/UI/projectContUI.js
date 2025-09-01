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
                <form method="dialog" class="add-project-form">
                <label>
                    Project Name:
                    <input type="text" name="projectName" required />
                </label>
                <menu>
                    <button value="cancel">Cancel</button>
                    <button id="confirmBtn" value="default">Add</button>
                </menu>
                </form>
            </dialog>
        `;

        this.projectListElement = this.root.querySelector('.project-list');
        this.addProjectBtn = this.root.querySelector('.add-project-btn');
        this.dialogElement = this.root.querySelector('.add-project-dialog');
        this.formElement = this.root.querySelector('.add-project-form');
    
        this.bindEvents();
    }
    //FEATURES:
    // create project
    // delete project
    // update project name

    build() {
        return this.root;
    }

    // bind events 
    bindEvents() {
        this.handleAddProjectBtn();
    }

    // listeners
    handleAddProjectBtn() {
        this.addProjectBtn.addEventListener('click', ()=> {
            this.showAddProjectModal();
        })
    }

    showAddProjectModal() {
        this.dialogElement.showModal();
    }
}

