import ProjectContainerUI from "./UI/projectContainerUI.js";
import projectUI from "./UI/projectUI.js";
import todoUI from "./UI/todoUI.js";
import './template.html';

export default class UiController {
    constructor() {
        this.root = document.getElementById('content');
    }

    init() {
        return this.root;
    }
}