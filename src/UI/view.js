import ProjectContUI from "./projectContUI";
import ProjectUI from "./projectUI";
import TodoUI from "./todoUI";

export default class View {
    constructor() {
        // element that we will append in the 'content' element.
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
//TODOS: 
// create ui modules for projects, and todos
// View is the root module