import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import * as UserService from "../../../services/UserService"

import Editor from "@ckeditor/ckeditor5-build-classic/build/ckeditor"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddUser() {
    const initialValues = {
        name: '',
        email: '',
        imageFile: null,
        password: '',
        role: 'USER', // Add this line
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email("Invalid Email Format").required('Email is required'),
        imageFile: Yup.mixed().required('Avatar is required'),
        password: Yup.string().required('Password is required').min(6, "Password at least 6 characters"),
        role: Yup.string().required('Role is required'), // Add this line
    });

    const [postImage, setPostImage] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("imageFile", values.imageFile);
        formData.append("password", values.password);
        formData.append("role", values.role); // Add this line

        const [result, error] = await UserService.insert(formData);
        if (result) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/user");
        }
        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Add Failed",
                text: "Email already existed",
                showConfirmButton: false,
                timer: 1500,
            });
            console.log(error);
        }
        setSubmitting(false);
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Add User</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/user"}>User</Link></li>
                                <li className="breadcrumb-item active">Add User</li>
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
                                    >
                                        {({ setFieldValue, isSubmitting, values }) => (
                                            <Form encType='multipart/form-data'>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name:</label>
                                                    <Field type="text" name="name" className="form-control" />
                                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="imageFile">Avatar:</label>
                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                        name="imageFile"
                                                        onChange={(event) => {
                                                            setFieldValue("imageFile", event.currentTarget.files[0]);
                                                            setPostImage(event.currentTarget.files[0]);
                                                        }}
                                                        accept="image/png, image/jpeg"
                                                    />
                                                    <ErrorMessage name="imageFile" component="div" className="text-danger" />
                                                </div>

                                                <div className="w-25 mb-3">
                                                    {postImage && (
                                                        <img
                                                            className='card-img'
                                                            alt={postImage.name}
                                                            src={URL.createObjectURL(postImage)}
                                                        />
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="email">Email (For Login):</label>
                                                    <Field type="text" name="email" className="form-control" />
                                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="password">Password:</label>
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
                                                    {isSubmitting ? 'Submitting...' : 'Submit'}
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

export default AddUser