import { API_URL } from "../common/constant";
import * as http from "../common/http-common";

const URLAPI = API_URL;

export const getAllReview = async () => {
    try {
        const response = await http.get(`${URLAPI}/api/Review`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getAllReviewByComicID = async (comicId) => {
    try {
        const response = await http.get(`${URLAPI}/api/Review/get-by-comic/${comicId}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};


export const deleteComment = async (id) => {
    try {
        const res = await http.remove(`${URLAPI}/api/Review/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}