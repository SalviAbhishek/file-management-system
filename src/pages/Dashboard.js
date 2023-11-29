import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../axios/api";
import { setAuthorizationToken } from "../axios/instance";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/auth";
import { fetchFiles, deleteFile } from "../redux/actions/files";
import { constants } from "../Utils";
import { Link, useNavigate } from "react-router-dom";
import FileThumbnail from "../components/FileThumnail";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const files = useSelector((state) => state.files.files);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let token = await localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        navigate("/login");
      } else {
        setAuthorizationToken(token);
        API.getUserDetails()
          .then((response) => {
            dispatch(login(response?.data?.user));
            setIsLoading(false);
            getAllFiles(page);
          })
          .catch((err) => {
            console.log(err);
            navigate("/login");
          });
      }
    };
    fetchData();
  }, []);

  const getAllFiles = async (page) => {
    setIsLoading(true);
    await API.getFiles(page)
      .then((response) => {
        setPage(page);
        setTotalPages(response?.data?.data?.totalPages);
        dispatch(fetchFiles([...files, ...response?.data?.data?.docs]));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await API.uploadFile(formData)
      .then((response) => {
        getAllFiles(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="container">
        <Header
          name={
            user != undefined
              ? `${user.first_name + " " + user?.last_name}`
              : "Please login to contiue"
          }
          logout={() => {
            dispatch(logout());
            navigate("/login");
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
          }}
        />
        <div
          style={{
            marginTop: 80,
          }}
        >
          <label className="custom-upload-btn">
            <input
              onChange={(e) => uploadFile(e)}
              type="file"
              style={{ display: "none" }}
            />
            Upload File
          </label>
        </div>
        <div className="row ">
          {files.map((file, index) => (
            <div className="col-md-2 col-xs-1 col-lg-3 g-4" key={file._id}>
              <div className="card">
                <FileThumbnail file={file} index={index} />
                <div className="card-body file-body">
                  <Link
                    target="_blank"
                    to={`${constants?.serverUrl}${file.url}`}
                    className="btn btn-primary"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger "
                    onClick={() => handleDelete(file._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isLoading ? (
          <div className="text-center">loading....</div>
        ) : totalPages > page ? (
          <div className="my-4 text-center">
            <button
              className="btn btn-primary"
              onClick={() => getAllFiles(page + 1)}
            >
              load more
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
