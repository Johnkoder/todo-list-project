export default class Todo {
    constructor(id, title, desc, dueDate, priority, isChecked) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isChecked = isChecked;
    }
}