import axios from "axios";

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
