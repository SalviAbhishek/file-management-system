import axios from "axios";
import { constants } from "../Utils";

const AxiosInst = axios.create({
  baseURL: constants.serverUrl,
});

export const setAuthorizationToken = (token) => {
  AxiosInst.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthorizationToken = () => {
  delete AxiosInst.defaults.headers.Authorization;
};

export default AxiosInst;
