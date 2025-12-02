import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from "@ckeditor/ckeditor5-build-classic/build/ckeditor"
import Swal from 'sweetalert2'
import Select from 'react-select'


import * as ComicService from "../../../services/ComicService"
import * as ActorService from "../../../services/ActorService"
import * as GenreService from "../../../services/GenreService"
import * as DirectorService from "../../../services/DirectorService"

function AddComic() {
    const navigate = useNavigate();
    const [postImage, setPostImage] = useState();

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
                "ImageFile",
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

    // Add these arrays for select options
    const typeOptions = [
        { value: 'Manga', label: 'Manga' },
        { value: 'Manhwa', label: 'Manhwa' },
        { value: 'Manhua', label: 'Manhua' },
    ];

    const statusOptions = [
        { value: 0, label: 'Published' },
        { value: 1, label: 'Ongoing' },
        { value: 2, label: 'Completed' },
    ];


    const initSelectOption = {
        value: "",
        label: ""
    }

    const [genres, setGenres] = useState([initSelectOption])
    const [actors, setActors] = useState([initSelectOption])
    const [directors, setDirectors] = useState([initSelectOption])

    const initialValues = {
        title: '',
        slug: '',
        description: '',
        releaseYear: new Date().getFullYear(),
        view: 0,
        rating: 0,
        type: '',
        status: '',
        ImageFile: null,
        ListActors: [],
        ListGenres: [],
        ListDirector: [],
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        releaseYear: Yup.number().required('Release year is required').min(1800).max(new Date().getFullYear()),
        view: Yup.number().min(0),
        rating: Yup.number().min(0).max(10),
        type: Yup.string().required('Type is required'),
        status: Yup.string().required('Status is required'),
        ImageFile: Yup.mixed().required('File is required'),
        ListActors: Yup.array().min(1, 'Select at least one actor'),
        ListGenres: Yup.array().min(1, 'Select at least one genre'),
        ListDirector: Yup.array().min(1, 'Select at least one director'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (Array.isArray(values[key])) {
                values[key].forEach(value => formData.append(`${key}[]`, value));
            } else {
                formData.append(key, values[key]);
            }
        });

        try {
            const [result, error] = await ComicService.insert(formData);
            if (result) {
                console.log(result);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Comic Added Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/comic");
            }
            if (error) {
                console.log(error);
            }

        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Add Failed",
                showConfirmButton: false,
                timer: 1500,
            });
            console.error(error);
        }
        setSubmitting(false);
    };

    const fetchApiData = async () => {
        const [genreData, err1] = await GenreService.getGenres()
        if (genreData) {
            const mappedGenres = genreData.data.map(genre => ({
                value: genre.id,
                label: genre.name
            }));
            setGenres(mappedGenres);
        }
        if (err1) {
            console.log(err1);
        }

        const [actorsData, err2] = await ActorService.getAll()
        if (actorsData) {
            const mappedActors = actorsData.data.map(actor => ({
                value: actor.id,
                label: actor.name
            }));
            setActors(mappedActors);
        }
        if (err2) {
            console.log(err2);
        }

        const [directorData, err3] = await DirectorService.getAll()
        if (directorData) {
            const mappedDirectors = directorData.data.map(director => ({
                value: director.id,
                label: director.name
            }));
            setDirectors(mappedDirectors);
        }
        if (err3) {
            console.log(err3);
        }
    }

    useEffect(() => {
        fetchApiData()
    }, []);

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Add Comic</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">Add Comic</li>
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
                                                    <label htmlFor="title">Title:</label>
                                                    <Field type="text" name="title" className="form-control"
                                                        onChange={(e) => {
                                                            setFieldValue("title", e.target.value);
                                                            setFieldValue("slug", e.target.value.toLowerCase().replace(/ /g, '-'));
                                                        }}
                                                    />
                                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="slug">Slug:</label>
                                                    <Field type="text" name="slug" className="form-control" readOnly />
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
                                                    <label htmlFor="releaseYear">Release Year:</label>
                                                    <Field type="number" name="releaseYear" className="form-control" />
                                                    <ErrorMessage name="releaseYear" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="view">View Count:</label>
                                                    <Field type="number" name="view" className="form-control" />
                                                    <ErrorMessage name="view" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="rating">Rating:</label>
                                                    <Field type="number" name="rating" className="form-control" step="0.1" />
                                                    <ErrorMessage name="rating" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="type">Type:</label>
                                                    <Select
                                                        options={typeOptions}
                                                        onChange={(option) => setFieldValue("type", option.value)}
                                                        placeholder="Select Type"
                                                    />
                                                    <ErrorMessage name="type" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status">Status:</label>
                                                    <Select
                                                        options={statusOptions}
                                                        onChange={(option) => setFieldValue("status", option.value)}
                                                        placeholder="Select Status"
                                                    />
                                                    <ErrorMessage name="status" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ImageFile">Poster:</label>
                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                        name="ImageFile"
                                                        onChange={(event) => {
                                                            setFieldValue("ImageFile", event.currentTarget.files[0]);
                                                            setPostImage(event.currentTarget.files[0]);
                                                        }}
                                                    />
                                                    <ErrorMessage name="ImageFile" component="div" className="text-danger" />
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
                                                    <label htmlFor="ListActors">Actors:</label>
                                                    <Select
                                                        isMulti
                                                        options={actors}
                                                        onChange={(options) => setFieldValue("ListActors", options.map(option => option.value))}
                                                        placeholder="Select Actors"
                                                    />
                                                    <ErrorMessage name="ListActors" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ListGenres">Genres:</label>
                                                    <Select
                                                        isMulti
                                                        options={genres}
                                                        onChange={(options) => setFieldValue("ListGenres", options.map(option => option.value))}
                                                        placeholder="Select Genres"
                                                    />
                                                    <ErrorMessage name="ListGenres" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ListDirector">Directors:</label>
                                                    <Select
                                                        isMulti
                                                        options={directors}
                                                        onChange={(options) => setFieldValue("ListDirector", options.map(option => option.value))}
                                                        placeholder="Select Directors"
                                                    />
                                                    <ErrorMessage name="ListDirector" component="div" className="text-danger" />
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

export default AddComic;