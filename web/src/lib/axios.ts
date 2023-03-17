import axios from 'axios'

// Configuração da api através do Axios
export const api = axios.create({
    baseURL: 'http://localhost:3333'
});