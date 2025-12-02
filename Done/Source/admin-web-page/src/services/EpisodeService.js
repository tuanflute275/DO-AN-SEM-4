import { API_URL } from "../common/constant";
import * as http from "../common/http-common";

const URLAPI = API_URL;

export const getAllComic = async () => {
    try {
        const response = await http.get(`${URLAPI}/api/Episode/get-all-comic`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const search = async (query) => {
    try {
        const response = await http.get(`${URLAPI}/api/Comic/search/${query}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getById = async (id) => {
    try {
        const response = await http.get(`${URLAPI}/api/Episode/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getAllEpisodeByComic = async (comicId) => {
    try {
        const response = await http.get(`${URLAPI}/api/Episode/ByComic/${comicId}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const postEpisode = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/api/Episode`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const updateEpisode = async (id, data) => {
    try {
        const res = await http.put(`${URLAPI}/api/Episode/${id}`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deletee = async (id) => {
    try {
        const res = await http.remove(`${URLAPI}/api/Episode/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}