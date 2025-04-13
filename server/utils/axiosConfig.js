import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'https://whatsapp-clone1-0x7d.onrender.com';  // replace this with your deployed backend URL
axios.defaults.withCredentials = true;

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default axios;
