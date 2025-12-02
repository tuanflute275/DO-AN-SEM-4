import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';

import * as Service from "../../../services/EpisodeService";

function UpdateEpisode() {
    const { id } = useParams();
    const [episode, setEpisode] = useState({});
    const [initialValues, setInitialValues] = useState({ id: 0, title: '', displayOrder: 1, status: '', comicId: 0 });
    const navigate = useNavigate();

    const EpisodeSchema = Yup.object().shape({
        title: Yup.string().required('Title Required'),
        displayOrder: Yup.number().required('Display Order Required'),
        status: Yup.string().required('Status Required')
    });

    const fetchEpisodeInformation = async (id) => {
        const [result, error] = await Service.getById(id);

        if (result) {
            setEpisode(result);
            setInitialValues({
                id: result.id,
                comicId: result.comicId,
                displayOrder: result.displayOrder,
                status: result.status,
                title: result.title
            });
        }

        if (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const [result, error] = await Service.updateEpisode(id, values);
            if (result) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: 'Update Success',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1);
            }

            if (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    text: error.response.data,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchEpisodeInformation(id);
    }, [id]);

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Update Episode {episode.title}, Comic '{episode?.comic?.title}'</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">Update Episode</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}  // Important to reset form values when initialValues change
                        validationSchema={EpisodeSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <Field
                                        id="title"
                                        name="title"
                                        type="text"
                                        className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
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
                                    {isSubmitting ? 'Updating...' : 'Update Episode'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    );
}

export default UpdateEpisode;
