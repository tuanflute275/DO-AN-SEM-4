import { API_URL } from "../common/constant";
import * as http from "../common/http-common";

const URLAPI = API_URL;

export const getAll = async () => {
    try {
        const response = await http.get(`${URLAPI}/api/EpisodeImages/get-all`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getAllByEpisode = async (episodeId) => {
    try {
        const response = await http.get(`${URLAPI}/api/EpisodeImages/get-by-episode/${episodeId}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getById = async (id) => {
    try {
        const response = await http.get(`${URLAPI}/api/EpisodeImages/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const insert = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/api/EpisodeImages`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const update = async (id, data) => {
    try {
        const res = await http.put(`${URLAPI}/api/EpisodeImages/${id}`, data, {
            "content-type": "multipart/form-data"
        });
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deletee = async (id) => {
    try {
        const res = await http.remove(`${URLAPI}/api/EpisodeImages/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}