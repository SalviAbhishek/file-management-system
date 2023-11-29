import { toast } from "react-toastify";

export const notify = (type, message) => {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    type: type,
  });
};

export const notifyTypes = {
  success: toast.TYPE.SUCCESS,
  error: toast.TYPE.ERROR,
  warning: toast.TYPE.WARNING,
  info: toast.TYPE.INFO,
  default: toast.TYPE.DEFAULT,
};

export const constants = {
  serverUrl: "http://localhost:5000/",
  // serverUrl: "https://file-management-server.onrender.com/",
};
