import Todo from './todo.js';
import promptSync from "prompt-sync";
const prompt = promptSync();

export default class Project {
    todos = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    createTodo() {
        // Append todo in todos array
        return;
    }
}