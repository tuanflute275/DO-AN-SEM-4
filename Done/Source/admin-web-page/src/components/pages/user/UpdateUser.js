import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import * as UserService from "../../../services/UserService"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../../common/constant';

function UpdateUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [postImage, setPostImage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const [result, error] = await UserService.getById(id);
            if (result) {
                setUser(result.data);
                // If you have an image URL, set it here
                if (result.data.avatar) {
                    result.data.avatar = `${API_URL}/${result.data.avatar}`;
                    setPostImage(result.data.avatar);
                }
            }
            if (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);

    const initialValues = {
        name: user?.name || '',
        email: user?.email || '',
        imageFile: null,
        password: '', // Password field is intentionally left blank
        role: user?.role || 'USER',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email("Invalid Email Format").required('Email is required'),
        imageFile: Yup.mixed().nullable(),
        password: Yup.string().min(6, "Password must be at least 6 characters"),
        role: Yup.string().required('Role is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", values.name);
        formData.append("email", values.email);
        if (values.imageFile) {
            formData.append("imageFile", values.imageFile);
        }
        if (values.password) {
            formData.append("password", values.password);
        }
        formData.append("role", values.role);

        const [result, error] = await UserService.update(id, formData);
        if (result) {
            console.log(result);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Update Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/user");
        }
        if (error) {
            console.log(error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update Failed",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
            console.log(error);
        }
        setSubmitting(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Update User</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/user">User</Link></li>
                                <li className="breadcrumb-item active">Update User</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card">
                                <div className="iq-card-body">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                        enableReinitialize={true}
                                    >
                                        {({ setFieldValue, isSubmitting, values }) => (
                                            <Form encType='multipart/form-data'>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name:</label>
                                                    <Field type="text" name="name" className="form-control" />
                                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <Field type="email" name="email" className="form-control" />
                                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="imageFile">Profile Image:</label>
                                                    <input
                                                        type="file"
                                                        name="imageFile"
                                                        onChange={(event) => {
                                                            setFieldValue("imageFile", event.currentTarget.files[0]);
                                                            setPostImage(URL.createObjectURL(event.target.files[0]));
                                                        }}
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage name="imageFile" component="div" className="text-danger" />
                                                    {postImage && (
                                                        <img src={postImage} alt={values.name} className="mt-2" style={{ maxWidth: '200px' }} />
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="password">Password (leave blank to keep current):</label>
                                                    <Field type="password" name="password" className="form-control" />
                                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="role">Role:</label>
                                                    <Field as="select" name="role" className="form-control">
                                                        <option value="USER">User</option>
                                                        <option value="ADMIN">Admin</option>
                                                    </Field>
                                                    <ErrorMessage name="role" component="div" className="text-danger" />
                                                </div>

                                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Updating...' : 'Update'}
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UpdateUser
