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
API.getFiles = async () => AxiosInst.get("files/list");
API.deleteFile = async (id) => AxiosInst.delete(`files/delete/${id}`);

export default API;
