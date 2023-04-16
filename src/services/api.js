import axios from "axios";

const api = axios.create({
  baseURL: "http://34.205.134.204:5001/api/",
});

export default api;
