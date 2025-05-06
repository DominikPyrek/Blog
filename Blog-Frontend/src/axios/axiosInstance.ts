import axios from "axios";

const api = axios.create({
    baseURL: 'https://eloquent-essence-production.up.railway.app',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});

export default api
  