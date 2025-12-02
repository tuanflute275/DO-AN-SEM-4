import axios from "axios";

const BASE_URL = "https://localhost:7128";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

//default url
axiosInstance.defaults.baseURL = BASE_URL

export const get = async (url, config = {}) => {
    const res = await axiosInstance.get(url, config);
    return res.data;
};

export const post = async (url, data, config = {}) => {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
};

export const put = async (url, data, config = {}) => {
    const res = await axiosInstance.put(url, data, config);
    return res.data;
};

export const remove = async (url, config = {}) => {
    const res = await axiosInstance.delete(url, config);
    return res.data;
};

export default axiosInstance;
