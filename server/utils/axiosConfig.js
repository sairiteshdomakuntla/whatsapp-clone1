import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    // You can add any common headers or transformations here
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
    // Handle common error cases here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export default axios;