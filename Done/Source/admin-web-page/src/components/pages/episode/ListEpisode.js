import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

import * as Service from "../../../services/EpisodeService"

function ListEpisode() {
    const { id } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [reload, setReloaded] = useState(false);

    const fetchDataAPI = async (id) => {
        try {
            const [result, error] = await Service.getAllEpisodeByComic(id);
            if (result) {
                console.log(result);
                setEpisodes(result);
            }
            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
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
                const [result, error] = await Service.deletee(id);
                if (result) {
                    Swal.fire("Deleted!", "", "success");
                    setReloaded(!reload); // Refresh the list after deletion
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
        fetchDataAPI(id)
    }, [id, reload])

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List Episode</h1>
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
                        <Link to={`/episode/add/${id}`} className="btn btn-primary">Add Episode</Link>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="button">Search</button>
                        </form>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Display Order</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                episodes && episodes.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td>{e.title}</td>
                                            <td>{e.displayOrder}</td>
                                            <td>{e.status === 1 ? "Published" : "Unpublished"}</td>
                                            <td>
                                                <Link to={`/images/${e.id}`} className="btn btn-success rounded-0 mr-2 btn-sm me-2">View Chapter Images</Link>
                                                <Link to={`/episode/edit/${e.id}`} className="btn btn-warning rounded-0 mr-2 btn-sm me-2">Update</Link>
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

export default ListEpisode