import Project from "../todoList/project.js";

export default class projectUI {
    constructor() {
        this.project = new Project();
        this.root = document.createElement('div');
    }

    render() {
        this.root.appendChild(renderTodos)
        return this.root;
    }

    renderTodos() {
        const todoList = this.project.todoList;
        const todoListElement = document.createElement('div')

        todoList.forEach(todo => {
            const todoDiv = document.createElement('div');

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox';
            const title = document.createElement('h3')
            const desc = document.createElement('p')
            const dueDate = document.createElement('span');
            const priority = document.createElement('span');

            checkbox.value = todo.isChecked;
            title.textContent = todo.title;
            desc.textContent = todo.desc;
            dueDate.textContent = todo.dueDate;
            priority.textContent = todo.priority;
            
            todoDiv.appendChild(checkbox);
            todoDiv.appendChild(title);
            todoDiv.appendChild(desc);
            todoDiv.appendChild(dueDate);
            todoDiv.appendChild(priority);

            todoListElement.append(todoDiv);
        })

        return todoListElement;
    }
} 