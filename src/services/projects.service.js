import axios from "axios";

class ProjectsService {
  // ** BASE URL and Token (to do)
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // ** HTTP Methods

  // GET
  getAllProjects = () => {
    return this.api.get("/api/projects");
  };

  // GET
  getProject = (id) => {
    return this.api.get(`/api/projects/${id}`);
  };

  getProjectsByTag = (tags) => {
    return this.api.get(`/api/projects/search-frontend?tags=${tags}`);
  }

  // GET : SEARCH
  searchProjects = (query) => {
    return this.api.get(`/api/projects/search-cms?title=${query}`)
  }

  // CREATE
  createProject = (requestBody) => {
    return this.api.post("/api/projects", requestBody);
  };

  // DELETE
  deleteProject = (id) => {
    return this.api.delete(`/api/projects/${id}`);
  };

  // PATCH /api/artworks/:id
  updateProject = (id, requestBody) => {
    return this.api.patch(`/api/projects/${id}`, requestBody);
  };
}

const projectsService = new ProjectsService();

export default projectsService;
