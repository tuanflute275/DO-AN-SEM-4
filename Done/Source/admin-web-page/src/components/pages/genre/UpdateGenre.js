import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as GenreService from "../../../services/GenreService";
import Swal from 'sweetalert2';

const GenreSchema = Yup.object().shape({
    name: Yup.string().required('Name Required'),
    slug: Yup.string().required('Slug Required'),
});

function UpdateGenre() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({ name: '', slug: '' });

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const [result, error] = await GenreService.getGenreById(id);
                if (result) {
                    setInitialValues(result.data);
                }
                if (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGenre();
    }, [id]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const [result, error] = await GenreService.updateGenre(id, values);
            // Handle success (e.g., show a success message, redirect, etc.)
            if (result) {
                console.log(result);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Update Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/genre");
            }
            if (error) {
                console.log(error);
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Update Genre</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">Update Genre</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={GenreSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <Field
                                        id="name"
                                        name="name"
                                        type="text"
                                        defaultValue={initialValues.name}
                                        className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                        onChange={(e) => {
                                            setFieldValue('name', e.target.value);
                                            setFieldValue('slug', e.target.value.toLowerCase().replace(/ /g, '-'));
                                        }}
                                    />
                                    {errors.name && touched.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="slug" className="form-label">Slug</label>
                                    <Field
                                        id="slug"
                                        name="slug"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control ${errors.slug && touched.slug ? 'is-invalid' : ''}`}
                                    />
                                    {errors.slug && touched.slug && (
                                        <div className="invalid-feedback">{errors.slug}</div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Genre'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    );
}

export default UpdateGenre;