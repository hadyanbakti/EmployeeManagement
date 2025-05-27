import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tugasakhirtcc-436215937980.us-central1.run.app/api", // Adjust the base URL as needed
  withCredentials: true,
});

export default axiosInstance;
