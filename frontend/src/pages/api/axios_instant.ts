import axois from 'axios';
import Domain from './domain';

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
        if (localStorage.getItem('token')) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
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
        if (err?.response?.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(err?.response?.data);
    }
)

export default axiosInstant;