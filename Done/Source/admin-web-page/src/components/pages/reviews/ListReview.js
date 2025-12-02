import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import * as Service from "../../../services/ComicService"
import * as ReviewService from "../../../services/ReviewService"
import Swal from 'sweetalert2'

function ListReview() {
    const { comicId } = useParams()
    
    const [comicData, setComicData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchComic = async (comicId) => {
        const [result, error] = await Service.getById(comicId);
        if (result) {
            console.log(result.data);
            setComicData(result.data);
        }

        if (error) {
            console.log(error);
        }
    }
    
    const fetchAllReviews = async (comicId) => { 
        const [result, error] = await ReviewService.getAllReviewByComicID(comicId);
        if (result) {
            console.log(result);
            
            setReviews(result)
        }
        if (error) {
            console.log(error);
            
        }
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Do you want to delete that comment ?",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
        })

        if (result.isConfirmed) {
            try {
                const [result, error] = await ReviewService.deleteComment(id);
                if (result) {
                    Swal.fire("Deleted!", "", "success");
                    setReload(!reload)
                }
                if (error) {
                    console.log(error);
                    Swal.fire("Error!", "Failed to delete the genre", "error");
                }
            } catch (error) {
                console.log(error);
                Swal.fire("Error!", "An unexpected error occurred", "error");
            }
        }
    }

    useEffect(() => {
        fetchComic(comicId);
        fetchAllReviews(comicId);
    }, [comicId, reload])

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Reviews Of '{comicData.title}'</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List Review Of '{comicData.title}'</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">User</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviews && reviews.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td>{e.user.name}</td>
                                            <td>{e.comment}</td>
                                            <td>{e.rating}</td>
                                            <td>
                                                <button className="btn btn-danger rounded-0 btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default ListReview