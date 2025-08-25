import ProjectContainer from "./todoList/projectContainer.js";
import promptSync from "prompt-sync";
const prompt = promptSync();

export default class Controller {
    static init() {
        const projectContainer = new ProjectContainer();

        while(true) {
            projectContainer.displayProjects();
            projectContainer.displayMenu();

            const choice = parseInt(prompt("=> ").trim());

            if(choice === 1) {
                projectContainer.createProject();
            } else if(choice === 2) {
                console.log("Pick one project")
                const id = parseInt(prompt("=> ").trim());
                projectContainer.pickProject(id);
            } else if(choice === 3) {
                console.log("Pick one to delete: ");
                const id = parseInt(prompt("=> ").trim());
                projectContainer.deleteProject(id);
            } else {
                return;
            }
        }
    }
}