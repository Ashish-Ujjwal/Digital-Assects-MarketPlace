import axios from 'axios';

// Main API client with base config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // e.g., http://localhost:8000/api
  withCredentials: true, // Sends cookies like refreshToken automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor — attach accessToken
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — handle expired token
apiClient.interceptors.response.use(
  (response) => {
    // This runs when the response is successful (status 2xx)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);

    // If unauthorized and hasn't retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/users/logout'
    ) {
        console.log("");
      originalRequest._retry = true;

      try {
        // Use a separate axios instance for refresh token
        const refreshRes = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );
        console.log(refreshRes);

        const newAccessToken = refreshRes.data.data.accessToken;

        // Save new token
        localStorage.setItem('accessToken', newAccessToken);

        // Update original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;




// Interceptor Type	                     When It Runs	                                    Why It’s Used
// Request Interceptor	  **Before the request is sent to the server**	    To modify or attach data to the request (like auth tokens, headers, etc.)
// Response Interceptor	  **After a response is received from the server**	To handle errors, transform data, or retry failed requests