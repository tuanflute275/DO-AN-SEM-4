import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import * as ChapterImagesService from "../../../services/ChapterImagesService"
import * as EpisodeService from "../../../services/EpisodeService"
import Swal from 'sweetalert2'
import { API_URL } from '../../../common/constant'

function ListChapterImage() {
    const { episodeId } = useParams()

    const [listImage, setListImage] = useState([])
    const [episode, setEpisode] = useState({});
    const [reload, setReload] = useState(false);

    const fetchApiData = async (id) => {
        const [result, error] = await ChapterImagesService.getAllByEpisode(id);
        if (result) {
            console.log(result);
            setListImage(result)
        }

        if (error) {
            console.log(error);

        }
    }

    const fetchEpisodeInformation = async (id) => {
        const [result, error] = await EpisodeService.getById(id);

        if (result) {
            setEpisode(result);
        }

        if (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Do you want to delete that item?",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
        })

        if (result.isConfirmed) {
            try {
                const [result, error] = await ChapterImagesService.deletee(id);
                if (result) {
                    Swal.fire("Deleted!", "", "success");
                    setReload(!reload); // Refresh the list after deletion
                }
                if (error) {
                    console.log(error);
                    Swal.fire("Error!", "Failed to delete the actor", "error");
                }
            } catch (error) {
                console.log(error);
                Swal.fire("Error!", "An unexpected error occurred", "error");
            }
        }
    }

    useEffect(() => {
        fetchApiData(episodeId)
        fetchEpisodeInformation(episodeId)
    }, [episodeId, reload])

    if (!listImage || !episode) {
        return (<p>Loading...</p>);
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List Images Of {episode.title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List Episode</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={`/images/add/${episodeId}`} className="btn btn-primary">Add Image</Link>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="button">Search</button>
                        </form>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Preview</th>
                                <th scope="col">Url</th>
                                <th scope="col">Display Order</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listImage && listImage.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td>{e.name}</td>
                                            <td style={{ width: "30%" }}>
                                                <img src={`${API_URL}/${e.url}`} alt={e.name} className='card-img' />
                                            </td>
                                            <td>{e.url}</td>
                                            {/* <td>{e.displayOrder}</td> */}
                                            <td>
                                                <Link to={`/images/edit/${e.id}`} className="btn btn-warning rounded-0 mr-2 btn-sm me-2">Update</Link>
                                                <button className="btn btn-danger rounded-0 btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default ListChapterImage