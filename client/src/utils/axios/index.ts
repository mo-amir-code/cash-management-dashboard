import axios from "axios";
import { SERVER_ORIGIN } from "../../config";

const httpAxios = axios.create({
  baseURL: `${SERVER_ORIGIN}/api/v1`,
  withCredentials: true,
});

export { httpAxios };
