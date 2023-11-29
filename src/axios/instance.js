import axios from "axios";

const AxiosInst = axios.create({
  baseURL: "http://localhost:5000/",
});

export const setAuthorizationToken = (token) => {
  AxiosInst.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthorizationToken = () => {
  delete AxiosInst.defaults.headers.Authorization;
};

export default AxiosInst;
