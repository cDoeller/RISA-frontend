import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  login = requestBody => {
    return this.api.post('/api/auth/login', requestBody);
  };

  signup = requestBody => {
    return this.api.post('/api/auth/signup', requestBody);
  };

  verify = () => {
    return this.api.get('/api/auth/verify');
  };
}

const authService = new AuthService();

export default authService;