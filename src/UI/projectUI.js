import Project from "../modules/projectLogic.js";

export default class ProjectUI {
    constructor(project) {
        this.projectLogic = project;
        this.root = document.createElement('div');
        this.root.className = 'project';
        //this.root.id = project.getId;

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
        //this.projectLogic.createTodo('test1', '', '', ''); //testing
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
        todoElement.id = todo.getId;
        todoElement.innerHTML = `
            <input type="checkbox" ${todo.getIsChecked? 'checked':''} />
            <span>${todo.getTitle}</span>
            <span>${todo.getDesc}</span>
            <span>${todo.getDueDate}</span>
            <span>${todo.getPriority}</span>

            <button class="todo-delete-btn">Delete</button>
            <button class="todo-update-btn">Update</button>

            <dialog class="update-todo-dialog">
                <h2>Todo</h2>
                <div>Name:</div>
                <input class="todo-name-update-input" required/>
                <div>Description:</div>
                <textarea class="todo-desc-update-input"></textarea>
                <div>Due Date:</div>
                <input type="date" class="todo-dueDate-update-input" />
                <select class="todo-priority-update-input" name="priority" id="priority">
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <button class="update-todo-dialog-cancel-btn">Cancel</button>
                <button class="update-todo-dialog-submit-btn">Submit</button>
            </dialog>
        `;
            //TODO: make an update-todo-dialog here ^^^^^
        this.handleTodoDeleteBtn(todoElement, todo);
        this.handleTodoUpdateBtn(todoElement, todo);
        this.handleUpdateTodoDialogCancelBtn(todoElement);

        return todoElement;
    }

    handleTodoUpdateBtn(todoElement, todo) {
        const todoUpdateBtn = todoElement.querySelector('.todo-update-btn');
        const todoUpdateDialog = todoElement.querySelector('.update-todo-dialog')
        todoUpdateBtn?.addEventListener('click', ()=> {
            todoUpdateDialog.showModal();

            this.handleAddTodoDialogCancelBtn(todoElement);
        })
    }

    todoUpdateBtnProcess() {
        //TODO: do this
        return;
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