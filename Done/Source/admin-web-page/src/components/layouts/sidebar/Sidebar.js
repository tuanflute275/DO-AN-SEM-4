import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearUser } from "../../../redux/reducers/user"
function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        const choose = await Swal.fire({
            title: "Do You Want To Log Out ?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
        });
        if (choose.isConfirmed) {
            dispatch(clearUser());
            navigate('/');
            Swal.fire({
                title: "You Logged Out Successfully",
                icon: 'success',
                timer: 1500,
                timerProgressBar: true,
                position: 'top-right'
            })
        }
    }

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link href="index3.html" className="brand-link">
                <img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                    style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </Link>

            <div className="sidebar mt-4">

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-open">
                            <Link href="" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Actor
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/actor"} className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>View List</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/actor/add"} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li className="nav-item menu-open">
                            <Link href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Director
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/director"} className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>View List</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/director/add"} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item menu-open">
                            <Link href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Genre
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/genre"} className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>View List</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/genre/add"} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item menu-open">
                            <Link href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Comic
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/comic"} className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>View List</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/comic/add"} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item menu-open">
                            <Link href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Comic's Review
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/listComic"} className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Manage</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item menu-open">
                            <Link href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Episodes
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/episode"} className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>View List</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item menu-open">
                            <Link href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    User
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/user"} className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>View List</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/user/add"} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        
                        <li className="nav-item">
                            <Link href="pages/widgets.html" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Personal Setting
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={handleLogout} className="nav-link">
                                <i className="nav-icon fas fa-sign-out-alt"></i>
                                <p>
                                    Log Out
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;