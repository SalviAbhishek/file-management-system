import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import API from "../axios/api";
import { notify, notifyTypes } from "../Utils";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { setAuthorizationToken } from "../axios/instance";

function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(null);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      mobile_number: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      username: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      mobile_number: Yup.number().required("Required"),
    }),
    onSubmit: async (data) => {
      setValues(data);
      API.sendOtp({
        identity: data?.username,
      })
        .then((response) => {
          notify(notifyTypes?.success, response?.data?.message);
          setStep(1);
        })
        .catch((error) => {
          notify(notifyTypes?.error, error?.response?.data?.message);
        });
    },
  });

  const emailOtpFormik = useFormik({
    initialValues: {
      email_otp: "",
    },
    validationSchema: Yup.object({
      email_otp: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (data) => {
      API.verifyOtp(values?.username, data.email_otp)
        .then((response) => {
          API.sendOtp({
            identity: values?.mobile_number,
          });
          setStep(2);
          emailOtpFormik.resetForm();
          notify(notifyTypes?.success, response?.data?.message);
        })
        .catch((error) => {
          notify(notifyTypes?.error, error?.response?.data?.message);
        });
    },
  });

  const mobileOtpFormik = useFormik({
    initialValues: {
      mobile_otp: "",
    },
    validationSchema: Yup.object({
      mobile_otp: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (data) => {
      API.verifyOtp(values?.mobile_number, data?.mobile_otp)
        .then((response) => {
          API.register(values)
            .then((response) => {
              notify(notifyTypes?.success, response?.data?.message);
              emailOtpFormik.resetForm();
              dispatch(login(values));
              localStorage.setItem("token", response?.data?.token);
              localStorage.setItem(
                "refresh_token",
                response?.data?.refresh_token
              );
              setAuthorizationToken(response?.data?.token);
              navigate("/");
            })
            .catch((error) => {
              setStep(0);
              notify(notifyTypes?.error, error?.response?.data?.message);
            });
        })
        .catch((error) => {
          notify(notifyTypes?.error, error?.response?.data?.message);
        });
    },
  });
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="card mx-4">
              <div className="card-body p-4">
                {step === 0 ? (
                  <form onSubmit={formik.handleSubmit}>
                    <h1>Register</h1>
                    <p>Create your account</p>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="first_name" className="form-label">
                          First Name
                        </label>
                        <input
                          id="first_name"
                          name="first_name"
                          type="text"
                          className="form-control mb-1"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.first_name}
                        />
                        {formik.touched.first_name &&
                        formik.errors.first_name ? (
                          <p className="error-label">
                            {formik.errors.first_name}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="last_name" className="form-label">
                          Last Name
                        </label>
                        <input
                          id="last_name"
                          name="last_name"
                          type="text"
                          className="form-control mb-1"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.last_name}
                        />
                        {formik.touched.last_name && formik.errors.last_name ? (
                          <p className="error-label">
                            {formik.errors.last_name}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          className="form-control mb-1"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <p className="error-label">
                            {formik.errors.username}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="form-control mb-1"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <p className="error-label">
                            {formik.errors.password}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="mobile_number" className="form-label">
                          Mobile Number
                        </label>
                        <input
                          id="mobile_number"
                          name="mobile_number"
                          type="text"
                          className="form-control mb-1"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.mobile_number}
                        />
                        {formik.touched.mobile_number &&
                        formik.errors.mobile_number ? (
                          <p className="error-label">
                            {formik.errors.mobile_number}
                          </p>
                        ) : null}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                        }}
                        className="col-md-6"
                      >
                        <p style={{ fontSize: 12 }} className="mt-4">
                          Already have account <Link to="/">Login</Link>
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{ width: "100%" }}
                      className="btn btn-primary my-2"
                    >
                      Create Account
                    </button>
                  </form>
                ) : step === 1 ? (
                  <form onSubmit={emailOtpFormik.handleSubmit}>
                    <h1>Verify Email Id</h1>
                    <p>We have send you the otp to {values?.username}</p>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="email_otp" className="form-label">
                          OTP
                        </label>
                        <input
                          id="email_otp"
                          name="email_otp"
                          type="text"
                          className="form-control mb-1"
                          onChange={emailOtpFormik.handleChange}
                          onBlur={emailOtpFormik.handleBlur}
                          value={emailOtpFormik.values.email_otp}
                        />
                        {emailOtpFormik.touched.email_otp &&
                        emailOtpFormik.errors.email_otp ? (
                          <p className="error-label">
                            {emailOtpFormik.errors.email_otp}
                          </p>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        style={{ width: "100%" }}
                        className="btn btn-primary my-2"
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={mobileOtpFormik.handleSubmit}>
                    <h1>Verify Mobile Number</h1>
                    <p>We have send you the otp to {values?.mobile_number}</p>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="mobile_otp" className="form-label">
                          OTP
                        </label>
                        <input
                          id="mobile_otp"
                          name="mobile_otp"
                          type="text"
                          className="form-control mb-1"
                          onChange={mobileOtpFormik.handleChange}
                          onBlur={mobileOtpFormik.handleBlur}
                          value={mobileOtpFormik.values.mobile_otp}
                        />
                        {mobileOtpFormik.touched.mobile_otp &&
                        mobileOtpFormik.errors.mobile_otp ? (
                          <p className="error-label">
                            {mobileOtpFormik.errors.mobile_otp}
                          </p>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        style={{ width: "100%" }}
                        className="btn btn-primary my-2"
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
