import axios from "axios";
// import convertObjectToArray from "@moon/utils/convertObjectToArray";

const instance = axios.create({
  baseURL: `/api`,
});

const API = {
  getLatestListing: async (params) => {
    try {
      const response = await instance.get(`/coins`, { params });

      return response;
    } catch (err) {
      return err;
    }
  },
};

export default API;
