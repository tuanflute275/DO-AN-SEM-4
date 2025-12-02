import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import * as DirectorService from "../../../services/DirectorService"

import Editor from "@ckeditor/ckeditor5-build-classic/build/ckeditor"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddDirector() {
    const editorConfig = {
        toolbar: {
            items: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedlist",
                "|",
                "outdent",
                "indent",
                "|",
                "fileUpload",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "undo",
                "redo",
                "alignMent",
                "code",
                "codeBlock",
                "findAndReplace",
                "fontColor",
                "fontFamily",
                "fontSize",
                "fontBackgroundColor",
                "highlight",
                "horizontalLine",
                "htmlEmbed",
                "imageInsert",

            ]
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        }
    }

    const initialValues = {
        name: '',
        birthday: '',
        imageFile: null,
        description: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        birthday: Yup.date().required('Birthday is required').max(new Date(), 'Birthday cannot be in the future'),
        imageFile: Yup.mixed().required('Avatar is required'),
        description: Yup.string().required('Description is required'),
    });

    const [postImage, setPostImage] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("birthday", values.birthday);
        formData.append("imageFile", values.imageFile);
        formData.append("description", values.description);

        const [result, error] = await DirectorService.insert(formData);
        if (result) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add Successfully",
                showConfirmButton: false,
                timer: 1500,    
            });
            navigate("/director");
        }
        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Add Failed",
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
                            <h1 className="m-0">Add Director</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/director"}>Director</Link></li>
                                <li className="breadcrumb-item active">Add Director</li>
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

                                                <div className='form-group'>
                                                    <label htmlFor="description">Description:</label>
                                                    <CKEditor
                                                        editor={Editor}
                                                        config={editorConfig}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setFieldValue("description", data);
                                                        }}
                                                    />
                                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="birthday">Birthday:</label>
                                                    <Field type="date" name="birthday" className="form-control" />
                                                    <ErrorMessage name="birthday" component="div" className="text-danger" />
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

export default AddDirector