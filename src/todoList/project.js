//import askUserInt from '../utils/askUserInt.js';
//import askUserString from '../utils/askUserString.js';
import Todo from './todo.js';
import { compareAsc, format } from "date-fns";

export default class Project {
    #todos = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // displays - development
    displayTodos() {
        for(const todo of this.#todos) {
            console.log(`${todo.id} - ${todo.title} - ${todo.desc} - ${todo.dueDate} - ${todo.priority} - ${todo.isChecked}`);
        }
    }

    displayTodosMenu() {
        console.log(`Project: ${this.name}`);
        console.log("[1] Create todo")
        console.log("[2] Update todo")
        console.log("[3] Delete todo")
        console.log("[4] Exit");
    }

    // features
    get todos() {
        return this.#todos;
    }

    createTodo() {
        const todoInfo = this.askUserTodoInfo();
        const newTodo = new Todo(todoInfo);
        this.#todos.push(newTodo);
    }

    deleteTodo() {
        for(let i = 0; i < this.#todos.length; i++) {
            if(this.#todos[i].id === id) {
                this.#todos.splice(i, 1);
            }
        }
    }

    // utils
    // askUserTodoInfo() {
    //     const id = this.#todos.length;
    //     let title, desc, dueDate, priority;
    //     console.log("Name: ");
    //     title = askUserString();
    //     console.log("description: ");
    //     desc = askUserString();
    //     console.log("Due Date: ");
    //     dueDate = this.askUserDueDate();
    //     console.log("Priority(y/n): ");
    //     priority = askUserString() === "y";
    //     return { id, title, desc, dueDate, priority }
    // }

    // askUserDueDate() {
    //     let year, day, month;
    //     console.log("Year: ")
    //     year = askUserInt();
    //     console.log("Month: ")
    //     month = askUserInt();
    //     console.log("Day: ");
    //     day = askUserInt();
    //     return format(new Date(year, month - 1, day), "yyyy-MM-dd");
    // }

    pickTodo(id) {
        for(let i = 0; i < this.#todos.length; i++) {
            if(this.#todos[i].id === id) {
                return this.#todos[i];
            }
        }
    }
}