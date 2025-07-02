import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7035/api/', // my localhost that the server running
});

export default api;
