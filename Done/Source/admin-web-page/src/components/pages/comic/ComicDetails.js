import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as Service from "../../../services/ComicService"
import { API_URL } from '../../../common/constant';

function ComicDetails() {
    const { id } = useParams();

    const [comic, setComic] = useState({});
    const [genres, setGenres] = useState([])
    const [actors, setActors] = useState([])
    const [directors, setDirectors] = useState([])

    const statusOptions = [
        { value: 0, label: 'Published' },
        { value: 1, label: 'Ongoing' },
        { value: 2, label: 'Completed' },
    ];

    const fetchComicInformation = async (id) => {
        // Replace this with actual API call
        const [result, error] = await Service.getById(id);

        if (result) {
            console.log(result.data);
            setComic(result.data)
        }

        if (error) {
            console.log(error);
        }
    };

    const fetchComicDetails = async (id) => {
        // Replace this with actual API call
        const [genresData, err1] = await Service.getComicGenres(id);

        if (genresData) {
            console.log(genresData.data);
            setGenres(genresData.data.map(item => item.genre.name))
        }

        if (err1) {
            console.log(err1);
        }

        const [actorsData, err2] = await Service.getComicActors(id);

        if (actorsData) {
            console.log(actorsData.data);
            setActors(actorsData.data.map(item => item.actor.name))
        }

        if (err2) {
            console.log(err2);
        }

        const [directorData, err3] = await Service.getComicDirector(id);

        if (directorData) {
            console.log(directorData.data);
            setDirectors(directorData.data.map(item => item.director.name))
        }

        if (err3) {
            console.log(err3);
        }
    };

    const getStatusLabel = (status) => {
        const statusObj = statusOptions.find(option => option.value === status);
        return statusObj ? statusObj.label : 'Unknown';
    };

    useEffect(() => {
        fetchComicInformation(id);
        fetchComicDetails(id)
    }, [id])

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Comic Details</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/comic"}>Comic</Link></li>
                                <li className="breadcrumb-item active">Comic Details</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    {comic ? (
                        <div className="row">
                            <div className="col-md-4">
                                <img src={`${API_URL}/${comic.poster}`} alt={comic.title} className="img-fluid" />
                            </div>
                            <div className="col-md-8">
                                <h2>{comic.title}</h2>
                                <p><strong>Slug:</strong> {comic.slug}</p>
                                <p><strong>Description:</strong> <div dangerouslySetInnerHTML={{ __html: comic.description }} /> </p>
                                <p><strong>Release Year:</strong> {comic.releaseYear}</p>

                                <p><strong>Actors:</strong> {actors.join(', ')}</p>
                                <p><strong>Directors:</strong> {directors.join(', ')}</p>
                                <p><strong>Genres:</strong> {genres.join(', ')}</p>

                                <p><strong>Views:</strong> {comic.view}</p>
                                <p><strong>Rating:</strong> {comic.rating}</p>
                                <p><strong>Type:</strong> {comic.type}</p>
                                <p><strong>Status:</strong> {getStatusLabel(comic.status)}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading comic details...</p>
                    )}
                </div>
            </section>
        </>
    )
}

export default ComicDetails