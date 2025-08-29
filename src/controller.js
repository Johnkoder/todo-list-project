import View from "./UI/view";
import './template.html';

export default class Controller {
    constructor() {
        this.root = document.getElementById('content');
    }

    init() {
        const view = new View();
        this.root.appendChild(view.render());
    }
}