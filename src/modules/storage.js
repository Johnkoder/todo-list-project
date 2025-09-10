import ProjectCont from './projectContLogic.js';
import Project from './projectLogic.js';
import Todo from './todoLogic.js';

const KEY = 'projectCont';

export function loadProjectCont() {
    const jsonProjectCont = localStorage.getItem(KEY);
    if (!jsonProjectCont) return null;  
    return ProjectCont.fromJSON(jsonProjectCont);
}

export function saveProjectCont(projectCont) {
    localStorage.setItem(KEY, JSON.stringify(projectCont.toJSON()));
}