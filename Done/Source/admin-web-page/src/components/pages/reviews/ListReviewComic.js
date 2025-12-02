import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as Service from "../../../services/EpisodeService"
import { API_URL } from './../../../common/constant';

function ListReviewComic() {
    const [comics, setComics] = useState([]);

    const fetchDataAPI = async () => {
        try {
            const [result, error] = await Service.getAllComic();
            if (result) {
                console.log(result);
                setComics(result);
            }
            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataAPI();
    }, []);

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List Comic</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List Comic</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={"/comic/add"} className="btn btn-primary">Add Comic</Link>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            {
                                comics && comics.map((e, i) => {
                                    return (
                                        <div className="col-xl-12" key={i}>
                                            <div className="card mb-3 card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-md-1 col-1">
                                                        <Link to={`/episode/list/${e.comic.id}`}>
                                                            <img src={`${API_URL}/${e.comic.poster}`} style={{ width: "90px" }} className="rounded-3" alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-10 col-10 pl-3">
                                                        <div className="overflow-hidden flex-nowrap">
                                                            <h6 className="mb-1">
                                                                <Link to={`/episode/list/${e.comic.id}`} href="#!" className="text-reset">{e.comic.title}</Link>
                                                            </h6>
                                                            <span className="text-muted d-block mb-2 small">
                                                                Latest Episode: {e.lastEpisode?.id} - {e.lastEpisode?.title}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <Link to={`/review/list/${e.comic.id}`} className="btn btn-primary stretched-link">View List Review</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ListReviewComic;
