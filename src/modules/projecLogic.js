import idGenerator from "../utils/idGenerator";
import Todo from "./todoLogic";

export default class Project {
    #id = idGenerator();
    #todoList = [];
    #name;
    constructor(name) {
        this.#name = name;
    }

    get getId() { return this.#id };
    get getTodoList() { return this.#todoList };
    get getName() { return this.#name };

    set setName(name) { this.#name = name };

    createTodo(title, desc, dueDate, priority) {
        const newTodo = new Todo(title, desc, dueDate, priority);
        this.#todoList.push(newTodo);
    }

    deleteTodo(id) {
        const todoIndex = this.findTodoIndex(id);
        this.#todoList.splice(todoIndex, 1);
    }

    findTodoIndex(id) {
        for(let i = 0; i < this.#todoList.length; i++) {
            if(this.#todoList[i].getId === id) {
                return i;
            }
        }
    }
}