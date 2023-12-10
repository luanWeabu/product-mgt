import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API_URL;

export const publicAxios = axios.create({
  baseURL,
});
