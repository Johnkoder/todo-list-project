import toBoolean from "../utils/toBoolean.js";

export default class Todo {
  #id;   
  #title;
  #desc;
  #dueDate;
  #priority;
  #isChecked = false;

  constructor({ id, title, desc, dueDate, priority }) {
    this.#id = id;
    this.#title = title;
    this.#desc = desc;
    this.#dueDate = dueDate;
    this.#priority = priority;
  }

    get id() { return this.#id };
    get title() { return this.#title }
    get desc() { return this.#desc }
    get dueDate() { return this.#dueDate }
    get priority() { return this.#priority }
    get isChecked() { return this.#isChecked }

    set id(id) { this.#id = id };
    set title(title) { this.#title = title }
    set desc(desc) { this.#desc = desc }
    set dueDate(dueDate) { this.#dueDate = dueDate }
    set priority(priority) { this.#priority = priority }
    set isChecked(isChecked) { this.#isChecked = isChecked }
}