import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import * as Service from "../../../services/UserService"
import Swal from 'sweetalert2';
import { API_URL } from '../../../common/constant';
function ListUser() {
    const [data, setData] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const fetchDataAPI = async () => {
        try {
            const [result, error] = await Service.getAll();
            if (result) {
                console.log(result);
                setData(result.data);
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
                    fetchDataAPI(); // Refresh the list after deletion
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

    const handleChange = async (e) => {
        console.log(e.target.value);
        setQuery(e.target.value)
    }

    useEffect(() => {
        fetchDataAPI();
    }, []);
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List User</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List User</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={"/user/add"} className="btn btn-primary">Add User</Link>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => handleChange(e)} />
                            <button className="btn btn-outline-success" type="button">Search</button>
                        </form>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td className='w-25'>
                                                <img className='card-img' src={`${API_URL}/${e.avatar}`} alt={e.name} />
                                            </td>
                                            <td>{e.name}</td>
                                            <td>{e.email}</td>
                                            <td>{e.role}</td>
                                            <td>
                                                <Link to={`/user/edit/${e.id}`} className="btn btn-warning rounded-0 mr-2 btn-sm me-2">Update</Link>
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
    );
}

export default ListUser