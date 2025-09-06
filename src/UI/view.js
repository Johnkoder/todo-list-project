import ProjectContUI from "./projectContUI";

import '../styles/view.css';

export default class View {
    constructor() {
        this.root = document.createElement('div');
        this.root.className = 'view'
    }

    render() {       
        const projectContUI = new ProjectContUI();
        this.root.append(
            projectContUI.build()        ); 
        return this.root;
    }
}
