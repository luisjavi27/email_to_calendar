import React from "react";
import image from "../assets/images/image.png";

import { Link } from "react-router-dom";

function SideBar() {
  return (
    <React.Fragment>
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon">
            <img className="w-100" src={image} alt="iimage-sidebar" />
          </div>
        </Link>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
          <br />
          <br />
        </li>
        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Menú</div>

        <li className="nav-item">
          <Link className="nav-link " to="/labels">
            <i className="fas fa-fw fa-folder"></i>
            <span>Correos por categoria</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/correos">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Ultimos correos</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/form">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Buddy (Amigo local)</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    </React.Fragment>
  );
}
export default SideBar;
