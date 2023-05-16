import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;
const authenticatedAxios = axios.create({ baseURL, withCredentials: true });
export default axios.create({
  baseURL,
  withCredentials: true,
});
export { authenticatedAxios };
