import ProjectContainer from "./todoList/projectContainer.js";
import askUserInt from "./utils/askUserInt.js";

export default class Controller {
    static init() {
        const controller = new Controller();
        controller.runProjectMenu();
    }

     runProjectMenu() {
        const projectContainer = new ProjectContainer();
        while(true) {
            projectContainer.displayProjects();
            projectContainer.displayMenu();

            const choice = askUserInt();

            if(choice === 1) {
                projectContainer.createProject();
            } else if(choice === 2) {
                console.log("Pick one project")
                const id = askUserInt();
                const chosenProject = projectContainer.pickProject(id);
                this.runTodosMenu(chosenProject);
            } else if(choice === 3) {
                console.log("Pick one to delete: ");
                const id = askUserInt();
                projectContainer.deleteProject(id);
            } else {
                return;
            }
        }
    }

    runTodosMenu(chosenProject) {
        while(true) {
            chosenProject.displayTodos();
            chosenProject.displayTodosMenu();

            const choice = askUserInt();

            if(choice === 1) {
                chosenProject.createTodo();
            } else if(choice === 2) {
                return;
            } else if(choice === 3) {
                return;
            } else {
                return;
            }
        }
    }
}