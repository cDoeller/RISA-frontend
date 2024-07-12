import axios from "axios";

class NewsService {
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
  getAllNews = () => {
    return this.api.get("/api/contributors");
  };

  // GET
  getNews = (id) => {
    return this.api.get(`/api/contributors/${id}`);
  };

//   getNewsByTitle = (title) => {
//     return this.api.get(`/api/contributors/search-frontend?name=${title}`);
//   }

  // GET : SEARCH
  searchNews = (query) => {
    return this.api.get(`/api/news/search-cms?title=${query}`);
  };

  // CREATE
  createNews = (requestBody) => {
    return this.api.post("/api/news", requestBody);
  };

  // DELETE
  deleteNews = (id) => {
    return this.api.delete(`/api/news/${id}`);
  };

  // UPDATE
  updateNews = (id, requestBody) => {
    return this.api.patch(`/api/news/${id}`, requestBody);
  };
}

const newsService = new NewsService();

export default newsService;
