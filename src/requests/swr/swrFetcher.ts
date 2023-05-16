import axios from "../axios/axios";
const fetcher = (url: string, params: any) =>
  axios.get(url, { params }).then((response) => response.data);
export default fetcher;
