import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Service from "../../../services/ActorService";
import Swal from 'sweetalert2';
import { API_URL } from '../../../common/constant';

function ListActor() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 2; // Define your page size

    const fetchDataAPI = async (page = 1) => {
        try {
            const [result, error] = await Service.getAllByPaginate(page, pageSize);
            if (result) {
                console.log(result.data);
                
                setData(result.data.data);
                setTotalPages(result.data.totalPages); // Total pages from API
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
        });

        if (result.isConfirmed) {
            try {
                const [result, error] = await Service.deletee(id);
                if (result) {
                    Swal.fire("Deleted!", "", "success");
                    fetchDataAPI(currentPage); // Refresh current page after deletion
                }
                if (error) {
                    Swal.fire("Error!", "Failed to delete the actor", "error");
                }
            } catch (error) {
                Swal.fire("Error!", "An unexpected error occurred", "error");
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchDataAPI(page); // Fetch new data for the selected page
    };

    const handleSearch = async () => {
        if (query.trim() !== '') {
            try {
                const [result, error] = await Service.search(query);
                if (result) {
                    setData(result.data); // Set the search results
                    setTotalPages(1); // Since search typically returns one page of results
                }
                if (error) {
                    Swal.fire("Error!", "Failed to search actors", "error");
                }
            } catch (error) {
                Swal.fire("Error!", "An unexpected error occurred", "error");
            }
        } else {
            fetchDataAPI(currentPage); // If query is empty, reset to paginated data
        }
    };

    useEffect(() => {
        fetchDataAPI(currentPage);
    }, [currentPage]);

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List Actor</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List Actor</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={"/actor/add"} className="btn btn-primary">Add Actor</Link>
                        <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                            <input className="form-control me-2" type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
                        </form>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Birthday</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((e, i) => (
                                <tr key={i}>
                                    <td>{e.id}</td>
                                    <td className='w-25'>
                                        <img className='card-img' src={`${API_URL}/${e.avatar}`} alt={e.name} />
                                    </td>
                                    <td>{e.name}</td>
                                    <td><div dangerouslySetInnerHTML={{ __html: e.description }} /></td>
                                    <td>{e.birthday}</td>
                                    <td>
                                        <Link to={`/actor/edit/${e.id}`} className="btn btn-warning rounded-0 me-2 btn-sm">Update</Link>
                                        <button className="btn btn-danger rounded-0 btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Component */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                            </li>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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

export default ListActor;
