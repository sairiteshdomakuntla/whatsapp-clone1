// import axios from 'axios';

// // Configure axios defaults
// axios.defaults.baseURL = "https://whatsapp-clone-qm0o.onrender.com";
// // console.log("first",import.meta.REACT_APP_PROJECT_URL)
// axios.defaults.withCredentials = true;

// // Add request interceptor
// axios.interceptors.request.use(
//   (config) => {
//     // No need to manually add token as it's handled by cookies
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Don't show unauthorized message for auth check endpoint
//       if (!error.config.url.includes('/api/user/auth')) {
//         console.log('Unauthorized access');
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axios;
import axios from 'axios';

// ✅ Set base URL for all requests
// const baseURL = 'https://whatsapp-clone-qm0o.onrender.com';
const baseURL = 'http://localhost:5000';

const axiosConfig = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Crucial: send cookies with every request
});

// ✅ Intercept responses to catch 401 errors
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!error.config.url.includes('/api/user/auth')) {
        console.log('Unauthorized access');
        // You can optionally redirect or logout here
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
