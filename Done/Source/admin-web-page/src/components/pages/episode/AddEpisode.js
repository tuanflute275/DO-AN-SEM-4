import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';

import * as Service from "../../../services/EpisodeService"
import * as ComicService from "../../../services/ComicService"

function AddEpisode() {
    const { comicId } = useParams()
    const [comic, setComic] = useState({});

    const navigate = useNavigate()

    const EpisodeSchema = Yup.object().shape({
        title: Yup.string().required('Title Required'),
        displayOrder: Yup.mixed().required('Display Order Required'),
        status: Yup.string().required('Status Required')
    });

    const fetchComicInformation = async (id) => {
        // Replace this with actual API call
        const [result, error] = await ComicService.getById(id);

        if (result) {
            console.log(result.data);
            setComic(result.data)
        }

        if (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            values.comicId = comicId;
            console.log(values);

            const [result, error] = await Service.postEpisode(values);
            // Handle success (e.g., show a success message, redirect, etc.)
            if (result) {
                console.log(result);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Add Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1 );
            }
            if (error) {
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    text: error.response.data,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchComicInformation(comicId)
    }, [comicId])

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Add Episode for {comic.title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">Add Episode</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <Formik
                        initialValues={{ title: '', displayOrder: 1, status: '' }}
                        validationSchema={EpisodeSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <Field
                                        id="title"
                                        name="title"
                                        type="text"
                                        className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                                        onChange={(e) => {
                                            setFieldValue('title', e.target.value);
                                        }}
                                    />
                                    {errors.title && touched.title && (
                                        <div className="invalid-feedback">{errors.title}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="displayOrder" className="form-label">Display Order</label>
                                    <Field
                                        id="displayOrder"
                                        name="displayOrder"
                                        type="number"
                                        className={`form-control ${errors.displayOrder && touched.displayOrder ? 'is-invalid' : ''}`}
                                        onChange={(e) => {
                                            setFieldValue('displayOrder', e.target.value);
                                        }}
                                    />
                                    {errors.displayOrder && touched.displayOrder && (
                                        <div className="invalid-feedback">{errors.displayOrder}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <Field
                                        as="select"
                                        id="status"
                                        name="status"
                                        className={`form-control ${errors.status && touched.status ? 'is-invalid' : ''}`}
                                        onChange={(e) => {
                                            setFieldValue('status', e.target.value);
                                        }}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="1">Published</option>
                                        <option value="0">Unpublished</option>
                                    </Field>
                                    {errors.status && touched.status && (
                                        <div className="invalid-feedback">{errors.status}</div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Adding...' : 'Add Episode'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    )
}

export default AddEpisode
