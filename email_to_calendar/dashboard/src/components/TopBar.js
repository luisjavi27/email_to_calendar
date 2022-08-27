import React from "react";
import foto from "../assets/images/CB-logo.png";

import { Link } from "react-router-dom";

function TopBar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        <ul className="navbar-nav ml-auto ">
          <li className="nav-item ml-4">Login</li>
          <li className="nav-item ml-4">Mis reservas</li>
          <li className="nav-item ml-4">Historial</li>

          {/* <div className="topbar-divider d-none d-sm-block"></div> */}
        </ul>
      </nav>
    </React.Fragment>
  );
}
export default TopBar;
