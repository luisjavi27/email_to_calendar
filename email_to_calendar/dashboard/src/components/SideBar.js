import React from "react";
import image from "../assets/images/CB-logo.png";

import { Link } from "react-router-dom";

function SideBar() {
  return (
    <React.Fragment>
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion   "
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center  mt-2 mb-4"
          to="/"
        >
          <div className="sidebar-brand-icon">
            <img className="w-100" src={image} alt="image-sidebar" />
          </div>
        </Link>

        {/*<!-- Nav Item - Dashboard -->*/}
      
        <hr className="sidebar-divider" />


        <li className="nav-item ">
          <Link className="nav-link ml-2 " to="/labels">
            <i className="fas fa-fw fa-folder"></i>
            <span  className="text-lg">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link ml-2 " to="/labels">
            <i className="fas fa-fw fa-folder"></i>
            <span className="text-lg">Login</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link ml-2" to="/correos">
            <i className="fas fa-fw fa-chart-area"></i>
            <span className="text-lg">Servicios</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link ml-2" to="/form">
            <i className="fas fa-fw fa-chart-area"></i>
            <span className="text-lg">Contacto</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link ml-2" to="/form">
            <i className="fas fa-fw fa-chart-area"></i>
            <span className="text-lg">Cancelaciones</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link ml-2" to="/form">
            <i className="fas fa-fw fa-chart-area"></i>
            <span className="text-lg">English</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    </React.Fragment>
  );
}
export default SideBar;
