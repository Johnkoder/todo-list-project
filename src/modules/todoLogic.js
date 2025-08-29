import idGenerator from "../utils/idGenerator.js";

export default class Todo {
    #id = idGenerator();
    #title;
    #desc; 
    #dueDate;
    #priority;
    #isChecked = false;
    constructor(title, desc, dueDate, priority) {
        this.#title = title;
        this.#desc = desc;
        this.#dueDate = dueDate;
        this.#priority = priority
    }

    get getId() { return this.#id };
    get getTitle() { return this.#title };
    get getDesc() { return this.#desc };
    get getDueDate() { return this.#dueDate };
    get getPriority() { return this.#priority };
    get getIsChecked() { return this.#isChecked };

    set setTitle(title) { this.#title = title };
    set setDesc(desc) { this.#desc = desc };
    set setDueDate(dueDate) { this.#dueDate = dueDate };
    set setPriority(priority) { this.#priority = priority };
    set setIsChecked(isChecked) { this.#isChecked = isChecked };
}