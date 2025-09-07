const KEY = 'projectList:v1';

export function loadProjectList() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveProjectList(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}