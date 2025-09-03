import Project from "../modules/projectLogic.js";

export default class ProjectUI {
    constructor() {
        this.projectLogic = new Project();
        this.root = document.createElement('div');
        this.root.className = 'project';

        this.root.innerHTML = `
            <div class="todo-list"></div>
            <button class="add-todo-btn">Add Todo</button>

            <dialog class="add-todo-dialog">
                <h2>Todo</h2>
                <div>Name:</div>
                <input class="todo-name-input" required/>
                <div>Description:</div>
                <textarea class="todo-desc-input"></textarea>
                <div>Due Date:</div>
                <input type="date" class="todo-dueDate-input" />
                <select class="todo-priority-input" name="priority" id="priority">
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <button class="add-todo-dialog-cancel-btn">Cancel</button>
                <button class="add-todo-dialog-submit-btn">Submit</button>
            </dialog>
        `;

        this.todoListElement = this.root.querySelector('.todo-list');
        this.addTodoBtn = this.root.querySelector('.add-todo-btn');

        this.addTodoDialog = this.root.querySelector('.add-todo-dialog')
        this.todoNameInput = this.addTodoDialog.querySelector('.todo-name-input')
        this.todoDescInput = this.addTodoDialog.querySelector('.todo-desc-input')
        this.todoDueDateInput = this.addTodoDialog.querySelector('.todo-dueDate-input')
        this.todoPriorityInput = this.addTodoDialog.querySelector('.todo-priority-input')
    
        this.addTodoDialogSubmitBtn = this.addTodoDialog.querySelector('.add-todo-dialog-submit-btn')
        this.addTodoDialogCancelBtn = this.addTodoDialog.querySelector('.add-todo-dialog-cancel-btn')
    
        this.bindEvents();
    }

    build() {
        return this.root;
    }

    bindEvents() {
        this.handleAddTodoBtn();
        this.handleAddTodoDialogCancelBtn();
        this.handleAddTodoDialogSubmitBtn();
    }

    handleAddTodoBtn() {
        this.addTodoBtn.addEventListener('click', ()=> {
            this.showAddTodoModal();
        })
    }

    handleAddTodoDialogSubmitBtn() {
        this.addTodoDialogSubmitBtn.addEventListener('click', ()=> {
            this.addTodoDialogSubmitBtnProcess()
        })
    }

    addTodoDialogSubmitBtnProcess() {
        //TODO: DO THIS
        console.log('test')
        return;
    }


    handleAddTodoDialogCancelBtn() {
        this.addTodoDialogCancelBtn.addEventListener('click', ()=> {
            this.closeAddTodoModal();
        })
    }

    showAddTodoModal() {
        this.addTodoDialog.showModal();
    }

    closeAddTodoModal() {
        this.clearAddTodoInputs();
        this.addTodoDialog.close();
    }

    clearAddTodoInputs() {
        this.todoNameInput.value = '';
        this.todoDescInput.value = '';
        this.todoDueDateInput.value = "";
        this.todoPriorityInput.value = '1';
    }
}