import View from "./UI/view";
import './template.html';

export default class Controller {
    constructor() {
        this.root = document.getElementById('content');
    }

    init() {
        const view = new View();
        //view.render();
        console.log(this.root);
    }
}