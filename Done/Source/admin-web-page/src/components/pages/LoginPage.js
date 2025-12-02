import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import * as AuthServices from "../../services/AuthService"
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setUser } from '../../redux/reducers/user';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required('Email Required'),
  password: Yup.string().min(6, 'Too Short!').required('Password Required'),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const [result, error] = await AuthServices.login(values);
    if (result) {
      console.log(result.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: "Login Success",
        showConfirmButton: false,
        timer: 1500
      });
      if (result.data.role === "ADMIN") {
        dispatch(setUser(result.data))
        navigate("/");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          text: "You don't have permission to access this page",
          title: "Access Denied",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/"); // Redirect to the login page or a public page
      }

    }
    if (error) {
      console.log(error.response.data);
      Swal.fire({
        position: "top-end",
        icon: "error",
        text: error.response.data.details,
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        {/* Left side - Image */}
        <div className="col-lg-6 d-none d-lg-flex bg-cover bg-center"
          style={{ backgroundImage: "url('https://wallpapers.com/images/hd/your-name-anime-film-rf4x5q2uwmfxfjb5.jpg')" }}></div>

        {/* Right side - Sign in form */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="w-100 p-4">
            <h2 className="text-center mb-4">Sign in to your account</h2>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      placeholder="Email address"
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                    />
                    {/* <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-0 mt-2 me-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button> */}
                    {errors.password && touched.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-100"
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
