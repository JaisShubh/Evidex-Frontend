import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'http://localhost:4000/api',timeout:15000});
api.interceptors.request.use(config=>{const token=localStorage.getItem('evidex.token');if(token)config.headers.Authorization=`Bearer ${token}`;return config});
api.interceptors.response.use(r=>r.data.data,e=>Promise.reject(new Error(e.response?.data?.error?.message||'Could not connect to EVIDEX API. Start the backend and check your connection.')));
export default api;
