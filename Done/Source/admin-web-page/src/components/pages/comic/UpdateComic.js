import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import Swal from 'sweetalert2';
import Select from 'react-select';

import * as ComicService from "../../../services/ComicService";
import * as ActorService from "../../../services/ActorService";
import * as GenreService from "../../../services/GenreService";
import * as DirectorService from "../../../services/DirectorService";
import { API_URL } from '../../../common/constant';

function UpdateComic() {
    const { id } = useParams();
    const navigate = useNavigate();

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

    const initSelectOption = {
        value: "",
        label: ""
    }

    const typeOptions = [
        { value: 'Manga', label: 'Manga' },
        { value: 'Manhwa', label: 'Manhwa' },
        { value: 'Manhua', label: 'Manhua' },
        { value: 'Generic', label: 'Generic' },
    ];

    const statusOptions = [
        { value: 0, label: 'Published' },
        { value: 1, label: 'Ongoing' },
        { value: 2, label: 'Completed' },
    ];

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        releaseYear: Yup.number().required('Release year is required').min(1800).max(new Date().getFullYear()),
        view: Yup.number().min(0),
        rating: Yup.number().min(0).max(10),
        type: Yup.string().required('Type is required'),
        status: Yup.string().required('Status is required'),
        ImageFile: Yup.mixed().nullable(),
        ListActors: Yup.array(),
        ListGenres: Yup.array(),
        ListDirector: Yup.array(),
    });

    const [postImage, setPostImage] = useState();
    const [initialValues, setInitialValues] = useState(null);

    const [genres, setGenres] = useState([initSelectOption]);
    const [actors, setActors] = useState([initSelectOption]);
    const [directors, setDirectors] = useState([initSelectOption]);

    const [comicGenres, setComicGenres] = useState([]);
    const [comicActors, setComicActors] = useState([]);
    const [comicDirectors, setComicDirectors] = useState([]);

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
    
        formData.append("Id", values.id);
        formData.append("Title", values.title);
        formData.append("Slug", values.slug);
        formData.append("Description", values.description);
        formData.append("ReleaseYear", values.releaseYear);
        formData.append("View", values.view);
        formData.append("Rating", values.rating);
        formData.append("Type", values.type);
        formData.append("Status", values.status);
        formData.append("ImageFile", values.ImageFile);
    
        // Handle ListActors, ListGenres, ListDirector by appending each item separately
        const actors = values.ListActors.length > 0 ? values.ListActors : comicActors;
        actors.forEach(actorId => {
            formData.append("ListActors[]", actorId);
        });
    
        const genres = values.ListGenres.length > 0 ? values.ListGenres : comicGenres;
        genres.forEach(genreId => {
            formData.append("ListGenres[]", genreId);
        });
    
        const directors = values.ListDirector.length > 0 ? values.ListDirector : comicDirectors;
        directors.forEach(directorId => {
            formData.append("ListDirector[]", directorId);
        });
    
        console.log([...formData.entries()]);  // To log all form data entries
    
        try {
            const [result, error] = await ComicService.update(id, formData);
            if (result) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Comic Updated Successfully",
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
                title: "Update Failed",
                showConfirmButton: false,
                timer: 1500,
            });
            console.error(error);
        }
        setSubmitting(false);
    };
    

    const fetchRelatedDataByComic = async (id) => {
        const [genreData] = await ComicService.getComicGenres(id);
        if (genreData && Array.isArray(genreData.data)) {
            console.log('genreData:', genreData.data);  // Check the data being returned

            // Map over the data to extract the IDs
            const mappedData= genreData.data.map(entry => entry.genre.id);

            console.log('mappedGenre:', mappedData);  // Logs array of IDs
            setComicGenres(mappedData);  // Set the array of IDs
        } else {
            console.log("No data found or data is not in expected format.");
        }

        const [actorsData] = await ComicService.getComicActors(id);
        if (actorsData && Array.isArray(actorsData.data)) {
            console.log('actorsData:', actorsData.data);  // Check the data being returned

            // Map over the data to extract the IDs
            const mappedData= actorsData.data.map(entry => entry.actor.id);

            console.log('mappedActor:', mappedData);  // Logs array of IDs
            setComicActors(mappedData);  // Set the array of IDs
        } else {
            console.log("No data found or data is not in expected format.");
        }

        const [directorData] = await ComicService.getComicDirector(id);

        if (directorData && Array.isArray(directorData.data)) {
            console.log('Director Data:', directorData.data);  // Check the data being returned

            // Map over the data to extract the  IDs
            const mappedData = directorData.data.map(entry => entry.director.id);

            console.log('Mapped Directors:', mappedData);  // Logs array of IDs
            setComicDirectors(mappedData);  // Set the array of IDs
        } else {
            console.log("No data found or data is not in expected format.");
        }


        console.log(`Array.isArray(comicActors): ${Array.isArray(comicActors)}`);
        console.log(`Array.isArray(comicGenres): ${Array.isArray(comicGenres)}`);
        console.log(`Array.isArray(comicDirectors): ${Array.isArray(comicDirectors)}`);
    };

    const fetchApiData = async () => {
        const [genreData] = await GenreService.getGenres();
        if (genreData) {
            const mappedGenres = genreData.data.map(genre => ({
                value: genre.id,
                label: genre.name
            }));
            setGenres(mappedGenres);
        }

        const [actorsData] = await ActorService.getAll();
        if (actorsData) {
            const mappedActors = actorsData.data.map(actor => ({
                value: actor.id,
                label: actor.name
            }));
            setActors(mappedActors);
        }

        const [directorData] = await DirectorService.getAll();
        if (directorData) {
            const mappedDirectors = directorData.data.map(director => ({
                value: director.id,
                label: director.name
            }));
            setDirectors(mappedDirectors);
        }
    };

    const fetchComicData = async (id) => {
        const [comicData] = await ComicService.getById(id);
        if (comicData) {
            const comic = comicData.data;
            console.log(comic);

            setInitialValues({
                id: comic.id,
                title: comic.title,
                slug: comic.slug,
                description: comic.description,
                releaseYear: comic.releaseYear,
                poster: comic.poster,
                view: comic.view,
                rating: comic.rating,
                type: typeOptions.find(option => option.value === comic.type).value,
                status: statusOptions.find(option => option.value === comic.status).value,
                ImageFile: postImage,
                ListActors: comicActors || [],
                ListGenres: comicGenres || [],
                ListDirector: comicDirectors || [],
            });

            console.log({
                id: comic.id,
                title: comic.title,
                slug: comic.slug,
                description: comic.description,
                releaseYear: comic.releaseYear,
                poster: comic.poster,
                view: comic.view,
                rating: comic.rating,
                type: typeOptions.find(option => option.value === comic.type).value,
                status: statusOptions.find(option => option.value === comic.status).value,
                ImageFile: postImage ? postImage : null,
                ListActors: comicActors,
                ListGenres: comicGenres,
                ListDirector: comicDirectors,
            });

        }
    };

    useEffect(() => {
        fetchApiData();
        fetchComicData(id);
        fetchRelatedDataByComic(id);
    }, [id]);

    if (!initialValues) {
        return <div>Loading...</div>;
    }

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
                                                        data={values.description}
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
                                                        defaultValue={typeOptions.find(option => option.value === values.type?.value)}
                                                        onChange={(option) => setFieldValue("type", option.value)}
                                                        placeholder="Select Type"
                                                    />

                                                    <ErrorMessage name="type" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status">Status:</label>
                                                    <Select
                                                        options={statusOptions}
                                                        defaultValue={statusOptions.find(option => option.value == values.status)}
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
                                                    {postImage ? (
                                                        <img className="card-img" alt={postImage.name} src={URL.createObjectURL(postImage)} />
                                                    ) : (
                                                        <img className="card-img" alt="Comic Poster" src={`${API_URL}/${initialValues.poster}`} />
                                                    )}

                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ListActors">Actors (keep it blank if you not update):</label>
                                                    <Select
                                                        isMulti
                                                        options={actors}
                                                        onChange={(options) => setFieldValue("ListActors", options.map(option => option.value))}
                                                        placeholder="Select Actors"
                                                    />

                                                    <ErrorMessage name="ListActors" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ListGenres">Genres (keep it blank if you not update):</label>
                                                    <Select
                                                        isMulti
                                                        options={genres}
                                                        onChange={(options) => setFieldValue("ListGenres", options.map(option => option.value))}
                                                        placeholder="Select Genres"
                                                    />
                                                    <ErrorMessage name="ListGenres" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ListDirector">Directors (keep it blank if you not update):</label>
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

export default UpdateComic;
