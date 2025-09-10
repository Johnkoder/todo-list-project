import Project from "../modules/projectLogic.js";
import '../styles/project.css';
import addIconUrl from '../icons/add.svg';
import updateIconUrl from '../icons/update.svg';
import deleteIconUrl from '../icons/delete.svg';

export default class ProjectUI {
    constructor(project, projectCont) {
        this.projectContLogic = projectCont;
        this.projectLogic = project;
        this.root = document.createElement('div');
        this.root.className = 'project';
        //this.root.id = project.getId;

        this.root.innerHTML = `
            <div>
                <h2>${project.getName} Todos</h2>
                <div class="todo-list"></div>
            </div>
            <img class="big-icon add-todo-btn" src="${addIconUrl}">
            
            <dialog class="add-todo-dialog">
                <div class="inputs-cont">
                    <h2>Todo</h2>
                    <h3>Name:</h3>
                    <input class="todo-name-input" required/>
                    <h3>Description:</h3>
                    <textarea class="todo-desc-input"></textarea>
                    <h3>Due Date:</h3>
                    <input type="date" class="todo-dueDate-input" />
                    <h3>Priority:</h3>
                    <select class="todo-priority-input" name="priority" id="priority">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

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
        this.renderTodoList();
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
            this.addTodoDialogSubmitBtnProcess();
        })
    }

    addTodoDialogSubmitBtnProcess() {
        const title = this.todoNameInput.value;
        const desc = this.todoDescInput.value;
        const dueDate = this.todoDueDateInput.value;
        const priority = this.todoPriorityInput.value;

        this.projectLogic.createTodo(title, desc, dueDate, priority);
        
        // TODO: save to localStorage
        this.projectContLogic.saveProjectCont();

        this.closeAddTodoModal();
        this.renderTodoList();
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

    createTodoElement(todo) {
        const todoElement = document.createElement('div');
        todoElement.className = 'todo-element'
        todoElement.id = todo.getId;
        todoElement.innerHTML = `
            <div class="todo-infos">
                <div>
                    <input class="todo-checkbox" type="checkbox" ${todo.getIsChecked? 'checked':''} />
                    <span>${todo.getTitle}</span>
                    <span>${todo.getDesc}</span>
                </div>
                <div>
                    <span>${todo.getDueDate}</span>
                    <span>${todo.getPriority}</span>
                </div>
            </div>

            <div>
                <img class="small-icon todo-update-btn" src="${updateIconUrl}">
                <img class="small-icon todo-delete-btn" src="${deleteIconUrl}">
            </div>

            <dialog class="update-todo-dialog">
                <div class="inputs-cont"> 
                    <h2>Todo</h2>
                    <h3>Name:</h3>
                    <input class="todo-name-update-input" required/>
                    <h3>Description:</h3>
                    <textarea class="todo-desc-update-input"></textarea>
                    <h3>Due Date:</h3>
                    <input type="date" class="todo-dueDate-update-input" />
                    <h3>Priority:</h3>
                    <select class="todo-priority-update-input" name="priority" id="priority">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <button class="update-todo-dialog-cancel-btn">Cancel</button>
                <button class="update-todo-dialog-submit-btn">Submit</button>
            </dialog>
        `;
        this.handleTodoCheckBox(todoElement, todo);
        this.handleTodoDeleteBtn(todoElement, todo);
        this.handleTodoUpdateBtn(todoElement, todo);
        this.handleUpdateTodoDialogCancelBtn(todoElement);
        this.handleUpdateTodoDialogSubmitBtn(todoElement, todo);

        return todoElement;
    }

    handleTodoCheckBox(todoElement, todo) {
        const todoCheckbox = todoElement.querySelector('.todo-checkbox')
        todoCheckbox.addEventListener('change',()=> {
            todo.setIsChecked = todoCheckbox.checked;
        })
    }

    handleTodoUpdateBtn(todoElement, todo) {
        const todoUpdateBtn = todoElement.querySelector('.todo-update-btn');
        const todoUpdateDialog = todoElement.querySelector('.update-todo-dialog');
        
        const todoNameUpdateInput = todoUpdateDialog.querySelector('.todo-name-update-input')
        const todoDescUpdateInput = todoUpdateDialog.querySelector('.todo-desc-update-input')
        const todoDueDateUpdateInput = todoUpdateDialog.querySelector('.todo-dueDate-update-input')
        const todoPriorityUpdateInput = todoUpdateDialog.querySelector('.todo-priority-update-input')

        todoUpdateBtn?.addEventListener('click', ()=> {
            todoUpdateDialog.showModal();
            todoNameUpdateInput.value = todo.getTitle;
            todoDescUpdateInput.value = todo.getDesc;
            todoDueDateUpdateInput.value = todo.getDueDate;
            todoPriorityUpdateInput.value = todo.getPriority;

            this.handleAddTodoDialogCancelBtn(todoElement);
        })
    }

    handleUpdateTodoDialogSubmitBtn(todoElement, todo) {
        const updateTodoDialogSubmitBtn = todoElement.querySelector('.update-todo-dialog-submit-btn');
        updateTodoDialogSubmitBtn.addEventListener('click',()=> {
            this.updateTodoDialogSubmitBtnProcess(todoElement, todo);
        })
    }

    updateTodoDialogSubmitBtnProcess(todoElement, todo) {
        const updateTodoDialog = todoElement.querySelector('.update-todo-dialog')
        const todoNameUpdateInput = updateTodoDialog.querySelector('.todo-name-update-input')
        const todoDescUpdateInput = updateTodoDialog.querySelector('.todo-desc-update-input')
        const todoDueDateUpdateInput = updateTodoDialog.querySelector('.todo-dueDate-update-input')
        const todoPriorityUpdateInput = updateTodoDialog.querySelector('.todo-priority-update-input')

        todo.setTitle = todoNameUpdateInput.value;
        todo.setDesc = todoDescUpdateInput.value;
        todo.setDueDate = todoDueDateUpdateInput.value;
        todo.setPriority = todoPriorityUpdateInput.value;

        this.renderTodoList();
    }

    handleUpdateTodoDialogCancelBtn(todoElement) {
        const updateTodoDialogCancelBtn = todoElement.querySelector('.update-todo-dialog-cancel-btn');
        const updateTodoDialog = todoElement.querySelector('.update-todo-dialog')
        updateTodoDialogCancelBtn.addEventListener('click',()=> {
            this.clearAddTodoInputs();
            updateTodoDialog.close();
        })
    }

    handleTodoDeleteBtn(todoElement, todo) {
        const todoDeleteBtn = todoElement.querySelector('.todo-delete-btn');
        todoDeleteBtn?.addEventListener('click', ()=> {
            this.todoDeleteBtnProcess(todo);
            this.renderTodoList();
        })
    }

    todoDeleteBtnProcess(todo) {
        this.projectLogic.deleteTodo(todo.getId);
    }

    renderTodoList() {
        this.removeChildren();
        const todoList = this.projectLogic.getTodoList;
        todoList.forEach(todo => {
            this.todoListElement.append(this.createTodoElement(todo));
        })
    }

    removeChildren() {
        while (this.todoListElement.firstChild) {
            this.todoListElement.removeChild(this.todoListElement.lastChild);
        }
    }

    clearAddTodoInputs() {
        this.todoNameInput.value = '';
        this.todoDescInput.value = '';
        this.todoDueDateInput.value = "";
        this.todoPriorityInput.value = '1';
    }
}