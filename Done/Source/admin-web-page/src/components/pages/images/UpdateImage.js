import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as ChapterImagesService from "../../../services/ChapterImagesService"
import { API_URL } from '../../../common/constant';

function UpdateImage() {
    const initValues = {
        name: '',
        displayOrder: '',
        imageFile: null,
        episodeId: '',
    };

    const initData = {
        name: "",
        url: "",
        displayOrder: "",
        episodeId: ""
    }

    const { id } = useParams();


    const [imageData, setImageData] = useState(initData);
    const [initialValues, setInitialValues] = useState(initValues)
    const [postImage, setPostImage] = useState();
    const navigate = useNavigate();

    const fetchDataAPI = async (id) => {
        try {
            const [result, error] = await ChapterImagesService.getById(id);
            if (result) {
                console.log("Fetched director data:", result);
                setImageData(result)
                setInitialValues({
                    ...initValues,
                    name: result.name,
                    displayOrder: result.displayOrder,
                    episodeId: result.episodeId
                });
            }
            if (error) {
                console.error("Error fetching director data:", error);
            }
        } catch (error) {
            console.error("Error in fetchDataAPI:", error);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("Form submitted with values:", values);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", values.name ? values.name : imageData.name);
        formData.append("displayOrder", values.displayOrder ? values.displayOrder : imageData.displayOrder);
        formData.append("imageFile", values.imageFile);
        formData.append("episodeId", imageData.episodeId);


        try {
            const [result, error] = await ChapterImagesService.update(id, formData);
            if (result) {
                console.log(result);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Update Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(-1);
            }
            if (error) {
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Update Failed",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
        setSubmitting(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        displayOrder: Yup.mixed().required('Display Order Required'),
        imageFile: Yup.mixed().nullable("Can be null"),
        episodeId: Yup.string().required('Description is required'),
    });


    useEffect(() => {
        fetchDataAPI(id)
    }, [id])

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Update Image</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link onClick={() => { navigate(-1) }}>Images</Link></li>
                                <li className="breadcrumb-item active">Update Image</li>
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
                                        {({ errors, touched, isSubmitting, setFieldValue }) => (
                                            <Form encType='multipart/form-data'>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name:</label>
                                                    <Field
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.name && touched.name && (
                                                        <div className="invalid-feedback">{errors.name}</div>
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="imageFile">Image:</label>
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

                                                <div className="w-25 mb-3">
                                                    {!postImage && (
                                                        <img
                                                            className='card-img'
                                                            alt={imageData.name}
                                                            src={`${API_URL}/${imageData.url}`}
                                                        />
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

export default UpdateImage