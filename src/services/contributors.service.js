import axios from "axios";

class ContributorsService {
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
  getAllContributors = () => {
    return this.api.get("/api/contributors");
  };

  // GET
  getContributor = (id) => {
    return this.api.get(`/api/contributors/${id}`);
  };

  getContributorsByName = (name) => {
    return this.api.get(`/api/contributors/search-frontend?name=${name}`);
  }

  // GET : SEARCH
  searchContributor = (query) => {
    return this.api.get(`/api/contributors/search-cms?name=${query}`);
  };

  // CREATE
  createContributor = (requestBody) => {
    return this.api.post("/api/contributors", requestBody);
  };

  // DELETE
  deleteContributor = (id) => {
    return this.api.delete(`/api/contributors/${id}`);
  };

  // UPDATE
  updateContributor = (id, requestBody) => {
    return this.api.patch(`/api/contributors/${id}`, requestBody);
  };
}

const contributorsService = new ContributorsService();

export default contributorsService;
