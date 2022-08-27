import React from 'react';
import foto from "../assets/images/LOGO.webp";


import { Link } from "react-router-dom";


function TopBar() {
	return (
		<React.Fragment>
			<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

				<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
					<i className="fa fa-bars"></i>
				</button>

				<ul className="navbar-nav ml-auto">

					<li className="nav-item dropdown no-arrow">
						<Link className="nav-link dropdown-toggle" to="/" id="userDropdown">
							<span className="mr-2 d-none d-lg-inline text-gray-600 small">Visitá nuestro sitio!</span>
							<img className="img-profile rounded-circle" src={foto} alt="Jordan Walke - Creador de React" width="60" />
						</Link>
					</li>

					<div className="topbar-divider d-none d-sm-block"></div>
					 
				</ul>

			</nav>

		</React.Fragment>
	)
}
export default TopBar;