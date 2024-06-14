import axios from "axios";

class ProjectsService {
  // ** BASE URL and Token (to do)
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });
  }

  // ** HTTP Methods

  // GET
  getAllProjects = () => {
    return this.api.get("/api/projects");
  };

  // CREATE
  createProject = (requestBody) => {
    return this.api.post("/api/projects", requestBody);
  };
}

const projectsService = new ProjectsService();

export default projectsService;
