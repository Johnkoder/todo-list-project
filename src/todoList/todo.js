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

    //display - for developemnt
    displayUpdateTodoMenu() {
        console.log("[1] - title")
        console.log("[2] - description")
        console.log("[3] - dueDate")
        console.log("[4] - priority")
        console.log("[5] - isChecked")
    }

    get id() { return this.#id };
    get title() { return this.#title }
    get desc() { return this.#desc }
    get dueDate() { return this.#dueDate }
    get priority() { return this.#priority }
    get isChecked() { return this.#isChecked }

    //features
    updateField({ fieldNum, answer }) {
        switch (fieldNum) {
            case 5:
                this.#isChecked = toBoolean(answer);
                break;
            case 4:
                this.#priority = toBoolean(answer);
                break;
            case 3:
                this.#dueDate = new Date(answer); // expects e.g. "2025-02-26"
                break;
            case 1:
                this.#title = answer;
                break;
            case 2:
                this.#desc = answer;
                break;
        }
    }

    
}