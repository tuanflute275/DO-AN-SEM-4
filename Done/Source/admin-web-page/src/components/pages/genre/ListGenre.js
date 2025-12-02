import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as GenreService from "../../../services/GenreService";
import Swal from 'sweetalert2';

function ListGenre() {
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 3; // Define your page size

    const fetchGenres = async (page = 1) => {
        try {
            const [result, error] = await GenreService.getGenresByPaginate(page, pageSize);
            if (result) {
                setGenres(result.data.data); // Adjust if API sends data inside `data`
                setTotalPages(result.data.totalPages); // Total pages from API
            }
            if (error) console.log(error);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Do you want to delete that item?",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
        });

        if (result.isConfirmed) {
            try {
                const [result, error] = await GenreService.deleteGenre(id);
                if (result) {
                    Swal.fire("Deleted!", "", "success");
                    fetchGenres(currentPage); // Refresh current page after deletion
                }
                if (error) Swal.fire("Error!", "Failed to delete the genre", "error");
            } catch (error) {
                Swal.fire("Error!", "An unexpected error occurred", "error");
            }
        }
    };

    const handleSearch = async () => {
        if (query.trim() !== '') {
            try {
                const [result, error] = await GenreService.search(query);
                if (result) {
                    setGenres(result.data); // Set the search results
                    setTotalPages(1); // Since search typically returns one page of results
                }
                if (error) {
                    Swal.fire("Error!", "Failed to search actors", "error");
                }
            } catch (error) {
                Swal.fire("Error!", "An unexpected error occurred", "error");
            }
        } else {
            fetchGenres(currentPage); // If query is empty, reset to paginated data
        }
    };

    const handleSearchForm = async (e) => {
        e.preventDefault();
        try {
            const [result, error] = await GenreService.getGenreByQuery(query);
            if (result) setGenres(result.data);
            if (error) console.log(error);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchGenres(page); // Fetch new data for the selected page
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List Genre</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List Genre</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={"/genre/add"} className="btn btn-primary">Add Genre</Link>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                className="btn btn-outline-success"
                                type="button"
                                onClick={handleSearchForm}
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map((genre, index) => (
                                <tr key={index}>
                                    <td>{genre.id}</td>
                                    <td>{genre.name}</td>
                                    <td>{genre.slug}</td>
                                    <td>
                                        <Link
                                            to={`/genre/edit/${genre.id}`}
                                            className="btn btn-warning rounded-0 btn-sm me-2"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="btn btn-danger rounded-0 btn-sm"
                                            onClick={() => handleDelete(genre.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Component */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    );
}

export default ListGenre;
