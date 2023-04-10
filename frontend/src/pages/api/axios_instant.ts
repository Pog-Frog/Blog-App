import axois from 'axios';
import Domain from './Domain';

let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}

const axiosInstant = axois.create({
    baseURL: Domain,
    headers: headers
});

axiosInstant.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstant.interceptors.response.use(
    response => response.data,
    err => {
        return Promise.reject(err?.response?.data);
    }
)

export default axiosInstant;