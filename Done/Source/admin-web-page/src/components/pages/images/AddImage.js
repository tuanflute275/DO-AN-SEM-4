import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as ChapterImagesService from '../../../services/ChapterImagesService';

const AddImage = () => {
    const { episodeId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        images: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Image name is required'),
                displayOrder: Yup.number()
                    .required('Display order is required')
                    .min(1, 'Must be at least 1'),
                imageFile: Yup.mixed().required('Image file is required'),
            })
        ),
    });

    // Handle file uploads
    const handleFileChange = (e, setFieldValue) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file, index) => ({
            id: `${file.name}-${index}`,
            name: file.name,
            displayOrder: index + 1,
            imageFile: file,
        }));
        setImages((prev) => [...prev, ...newImages]);
        setFieldValue('images', [...images, ...newImages]);
    };

    // Remove an image from the list
    const handleRemoveImage = (index, values, setFieldValue) => {
        const updatedImages = values.images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setFieldValue('images', updatedImages);
    };

    // Clear all uploaded files and reset the form
    const handleClear = (resetForm) => {
        setImages([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        resetForm();
    };

    // Save images via API
    const handleSave = async (values) => {
        try {
            for (const img of values.images) {
                const formData = new FormData();
                formData.append('Name', img.name);
                formData.append('DisplayOrder', img.displayOrder);
                formData.append('EpisodeId', episodeId);
                formData.append('ImageFile', img.imageFile);

                const [result, err] = await ChapterImagesService.insert(formData);
                if (result) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Upload Successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/episode');
                }
                if (err) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Upload Failed',
                        titleText: err,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Upload Failed',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <Formik
            initialValues={{ images: [] }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
        >
            {({ values, setFieldValue, resetForm }) => (
                <>
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Upload Chapter Images</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <Link onClick={() => navigate(-1)}>Images</Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Upload Chapter Images
                                        </li>
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
                                            <div className="form-group">
                                                <label>Image:</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/png, image/jpeg"
                                                    multiple
                                                    ref={fileInputRef}
                                                    onChange={(e) =>
                                                        handleFileChange(e, setFieldValue)
                                                    }
                                                />
                                            </div>

                                            <Form>
                                                <FieldArray name="images">
                                                    {({ remove }) =>
                                                        values.images.map((img, index) => (
                                                            <div
                                                                key={index}
                                                                className="card p-5 mt-3"
                                                            >
                                                                <div className="form-group">
                                                                    <label>Preview Image:</label>
                                                                    <img
                                                                        src={URL.createObjectURL(img.imageFile)}
                                                                        alt={img.name}
                                                                        width={100}
                                                                        className="mb-2"
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label>Image Name:</label>
                                                                    <Field
                                                                        name={`images[${index}].name`}
                                                                        className="form-control mb-2"
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`images[${index}].name`}
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

                                                                {/* <div className="form-group">
                                                                    <label>Display Order:</label>
                                                                    <Field
                                                                        type="number"
                                                                        name={`images[${index}].displayOrder`}
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`images[${index}].displayOrder`}
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div> */}

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger ms-3"
                                                                    onClick={() =>
                                                                        handleRemoveImage(index, values, setFieldValue)
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ))
                                                    }
                                                </FieldArray>

                                                {values.images.length > 0 && (
                                                    <div className="mt-3">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary ms-2"
                                                            onClick={() => handleClear(resetForm)}
                                                        >
                                                            Clear
                                                        </button>
                                                    </div>
                                                )}
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </Formik>
    );
};

export default AddImage;
