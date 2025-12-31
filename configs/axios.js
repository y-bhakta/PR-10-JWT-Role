import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'http://localhost:8547/api'
});

export default axiosInstance;