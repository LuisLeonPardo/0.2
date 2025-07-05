import axios from 'axios';

// Crea una instancia de Axios apuntando al backend de FastAPI

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
