import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import API from "../axios/api";
import { notify, notifyTypes } from "../Utils";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { setAuthorizationToken } from "../axios/instance";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      API.login(values)
        .then((response) => {
          dispatch(login(response?.data?.user));
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("refresh_token", response?.data?.refresh_token);
          setAuthorizationToken(response?.data?.token);
          notify(notifyTypes?.success, response?.data?.message);
          navigate("/");
        })
        .catch((error) => {
          notify(notifyTypes?.error, error?.response?.data?.message);
        });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      let token = await localStorage.getItem("token");
      if (token) {
        navigate("/");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="card mx-4">
              <div className="card-body p-4">
                <form onSubmit={formik.handleSubmit}>
                  <h1>Login</h1>
                  <p>Sign In to your account</p>
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    autoComplete="off"
                    type="text"
                    className="form-control mb-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <p className="error-label">{formik.errors.username}</p>
                  ) : null}

                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    autoComplete="off"
                    type="password"
                    className="form-control mb-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="error-label">{formik.errors.password}</p>
                  ) : null}

                  <button
                    type="submit"
                    style={{ width: "100%" }}
                    className="btn btn-primary my-4"
                  >
                    Login
                  </button>
                  <div className="row">
                    <div className="col-md-6">
                      <Link to="/register">Register Now</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
