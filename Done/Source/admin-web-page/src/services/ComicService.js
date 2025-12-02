import { API_URL } from "../common/constant";
import * as http from "../common/http-common";
import axios from 'axios';

const URLAPI = API_URL;

export const getAll = async () => {
    try {
        const response = await axios.get(`${URLAPI}/api/Comic`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const search = async (query) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Comic/search/${query}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};
export const getAllByPaginate = async (page = 1, pageSize = 2) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Comic/by-paginate?page=${page}&pageSize=${pageSize}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getComicGenres = async (id) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Comic/Genres/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getComicDirector = async (id) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Comic/Directors/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getComicActors = async (id) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Comic/Actors/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getById = async (id) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Comic/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const insert = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/api/Comic`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const update = async (id, data) => {
    try {
        const res = await http.put(`${URLAPI}/api/Comic/${id}`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deletee = async (id) => {
    try {
        const res = await http.remove(`${URLAPI}/api/Comic/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}