import axios from "axios";

const api = axios.create({
  baseURL: "http://3.222.205.179:5001/api/",
});

export default api;

