import axios from "axios";
import env from "dotenv";
env.config();

const axiosInstance=axios.create({
    baseURL:`${process.env.API_URL}api`
});

export default axiosInstance;