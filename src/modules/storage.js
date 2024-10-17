export const saveToLocalStorage = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  
  export const loadFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : null;
  }
  