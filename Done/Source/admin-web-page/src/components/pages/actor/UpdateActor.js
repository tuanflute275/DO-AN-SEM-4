import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import * as ActorService from "../../../services/ActorService"

import Editor from "@ckeditor/ckeditor5-build-classic/build/ckeditor"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../../common/constant';

function UpdateActor() {
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

    const initiValues = {
        name: '',
        birthday: '',
        imageFile: null,
        description: '',
    };

    const initActorData = {
        name: "",
        avatar: "",
        birthday: "",
        description: ""
    }

    const { id } = useParams();


    const [actorData, setActorData] = useState(initActorData);
    const [initialValues, setInitialValues] = useState(initiValues)
    const [postImage, setPostImage] = useState();
    const navigate = useNavigate();

    const fetchDataAPI = async (id) => {
        try {
            const [result, error] = await ActorService.getById(id);
            if (result) {
                console.log("Fetched actor data:", result.data);
                setActorData(result.data)
                setInitialValues({
                    ...initiValues,
                    name: result.data.name,
                    birthday: result.data.birthday,
                    description: result.data.description
                });
            }
            if (error) {
                console.error("Error fetching actor data:", error);
            }
        } catch (error) {
            console.error("Error in fetchDataAPI:", error);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("Form submitted with values:", values);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", values.name ? values.name : actorData.name);
        formData.append("birthday", values.birthday ? values.birthday : actorData.birthday);
        formData.append("imageFile", values.imageFile);
        formData.append("description", values.description ? values.description : actorData.description);

        try {
            const [result, error] = await ActorService.update(id, formData);
            if (result) {
                console.log(result);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Update Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/actor");
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
            setSubmitting(false);
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        birthday: Yup.date().required('Birthday is required').max(new Date(), 'Birthday cannot be in the future'),
        imageFile: Yup.mixed().nullable("Can be null"),
        description: Yup.string().required('Description is required'),
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
                            <h1 className="m-0">Update Actor</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/actor"}>Actor</Link></li>
                                <li className="breadcrumb-item active">Update Actor Information</li>
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

                                                <div className="w-25 mb-3">
                                                    {!postImage && (
                                                        <img
                                                            className='card-img'
                                                            alt={actorData.name}
                                                            src={`${API_URL}/${actorData.avatar}`}
                                                        />
                                                    )}
                                                </div>

                                                <div className='form-group'>
                                                    <label htmlFor="description">Description:</label>
                                                    <CKEditor
                                                        editor={Editor}
                                                        config={editorConfig}
                                                        data={actorData.description}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setFieldValue("description", data);
                                                        }}
                                                    />
                                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="birthday">Birthday:</label>
                                                    <Field type="date" id="birthday" name="birthday" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
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

export default UpdateActor