import { API_URL } from "../common/constant";
import * as http from "../common/http-common";
import axios from 'axios';

const URLAPI = API_URL;

export const getAll = async () => {
    try {
        const response = await axios.get(`${URLAPI}/api/User`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getById = async (id) => {
    try {
        const response = await axios.get(`${URLAPI}/api/User/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const insert = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/api/User/create`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const update = async (id, data) => {
    try {
        const res = await http.put(`${URLAPI}/api/User/${id}`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deletee = async (id) => {
    try {
        const res = await http.remove(`${URLAPI}/api/User/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}