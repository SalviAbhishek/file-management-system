import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../axios/api";
import { setAuthorizationToken } from "../axios/instance";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";
import { fetchFiles, deleteFile } from "../redux/actions/files";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const files = useSelector((state) => state.files.files);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("called");
    const fetchData = async () => {
      let token = await localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
      } else {
        setAuthorizationToken(token);
        API.getUserDetails()
          .then((response) => {
            console.log(response?.data);
            dispatch(login(response?.data?.user));
            setIsLoading(false);
            getAllFiles(page);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchData();
  }, []);

  const getAllFiles = async (page) => {
    await API.getFiles()
      .then((response) => {
        console.log(response?.data);
        dispatch(fetchFiles([...files, ...response?.data?.data?.docs]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    console.log(id);

    await API.deleteFile(id)
      .then((response) => {
        dispatch(deleteFile(id));
      })
      .catch((err) => {});
  };
  return (
    <div className="row justify-content-center">
      <div className="container">
        {isLoading
          ? "loading"
          : user != undefined
          ? `welcome ${user.username}`
          : "Please login to contiue"}

        <div className="row">
          {files.map((file) => (
            <div
              style={{
                border: "1px solid grey",
                borderRadius:15
              }}
              className=" col-md-3 px-4 pb-4 mx-2 my-2 "
              key={file._id}
            >
              <a href={`http://localhost:5000/${file?.url}`}>
                <p>{file?._id}</p>
              </a>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(file._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
