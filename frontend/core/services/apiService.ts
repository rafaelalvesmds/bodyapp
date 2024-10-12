import axios from 'axios';

const API_URL = 'http://localhost:5002';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adicionar interceptores de resposta, autenticação, etc, se necessário
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Aqui você pode centralizar o tratamento de erros
        return Promise.reject(error.response?.data?.error || 'Erro na requisição');
    }
);

export default api;
