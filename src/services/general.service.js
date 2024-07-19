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
  getGeneralData = () => {
    return this.api.get("/api/general");
  };

  // UPDATE
  updateGeneralData = (id, requestBody) => {
    return this.api.patch(`/api/general/${id}`, requestBody);
  };
}

const contributorsService = new ContributorsService();

export default contributorsService;
