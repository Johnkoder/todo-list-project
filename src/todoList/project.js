import Todo from './todo.js';

export default class Project {
    #todoList = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // features
    get todoList() {
        return this.#todoList;
    }

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