import ProjectCont from "../modules/projectContLogic";

export default class ProjectContUI {
    constructor() {
        this.logic = new ProjectCont();
        this.root = document.createElement('div');
        this.root.className = 'project-cont';

        this.projectListElement = document.createElement('div');

        this.addProjectBtn = document.createElement('button');
        this.createAddProjectBtn();

        this.dialogElement = document.createElement('dialog');
        this.createAddProjectModal();
    }
    //FEATURES:
    // create project
    // delete project
    // update project name

    render() {


        this.handleListeners();
        this.root.append(
            this.addProjectBtn
        );
        return this.root;
    }

    //listeners
    handleListeners() {
        this.handleAddProjectBtn();
    }

    handleAddProjectBtn() {
        this.addProjectBtn.addEventListener('click', ()=> {
            this.showAddProjectModal();
        })
    }

    showAddProjectModal() {
        this.dialogElement.showModal();
    }

    // element creation
    createAddProjectBtn() {
        this.addProjectBtn.className = 'add-project-btn';
        this.addProjectBtn.textContent = '+';
    }

    createAddProjectModal() {
        const inputElement = document.createElement('input');
        const titleElement = document.createElement('h2');
        titleElement.textContent = 'Add Project';
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';

        this.dialogElement.append(titleElement, inputElement, submitBtn);
    }


}

//TODO: change codebase to template approach
