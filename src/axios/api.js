import AxiosInst from "./instance";
const API = {};

/* --------------- auth apis starts --------------------------- */

API.login = async (data) => AxiosInst.post("auth/login", data);
API.register = async (data) => AxiosInst.post("auth/register", data);

/* --------------- verification apis starts --------------------------- */

API.sendOtp = async (data) => AxiosInst.post("otp", data);
API.verifyOtp = async (identity, otp) =>
  AxiosInst.get(`otp?identity=${identity}&otp=${otp}`);

/* --------------- user apis starts --------------------------- */

API.getUserDetails = async () => AxiosInst.get("user");

/* --------------- files apis starts --------------------------- */
API.getFiles = async (page) =>
  AxiosInst.get(`files/list?page=${page ? page : 1}&limit=8`);
API.deleteFile = async (id) => AxiosInst.delete(`files/delete/${id}`);
API.uploadFile = async (data) => AxiosInst.post(`files/upload`, data);

export default API;
