import { API_URL } from "../common/constant";
import * as http from "../common/http-common";
import axios from 'axios';

const URLAPI = API_URL;

export const getAll = async () => {
    try {
        const response = await axios.get(`${URLAPI}/api/Director`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const search = async (query) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Director/search/${query}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getAllByPaginate = async (page = 1, pageSize = 2) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Director/by-paginate?page=${page}&pageSize=${pageSize}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getById = async (id) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Director/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const insert = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/api/Director`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const update = async (id, data) => {
    try {
        const res = await http.put(`${URLAPI}/api/Director/${id}`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deletee = async (id) => {
    try {
        const res = await http.remove(`${URLAPI}/api/Director/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}