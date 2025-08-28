import Todo from './todo.js';

export default class Project {
    #todoList = [];
    #id;
    #name;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    get id() { return this.#id };
    get name() { return this.#name };
    get todoList() {
        return this.#todoList;
    }

    // features
    createTodo(todoInfo) {
        const newTodo = new Todo(todoInfo);
        this.#todoList.push(newTodo);
    }

    deleteTodo(id) {
        for(let i = 0; i < this.#todoList.length; i++) {
            if(this.#todoList[i].id === id) {
                this.#todoList.splice(i, 1);
            }
        }
    }
}