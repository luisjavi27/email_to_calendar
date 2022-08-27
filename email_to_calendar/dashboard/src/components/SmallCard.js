import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SmallCard(props) {
  return (
      <div className="col-md-4 mb-4">
          <Link to={props.link}>
        <div className={`card border-left-primary shadow h-100 py-2`}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div
                  className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}
                >
                  {props.title}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {props.count}
                </div>
              </div>
              <div className="col-auto">
                <i className={` fa-2x text-gray-300`}></i>
                <FontAwesomeIcon icon={props.icon} />
              </div>
            </div>
          </div>
        </div>
    </Link>
      </div>
  );
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

SmallCard.defaultProps = {
  title: "No Title",
  color: "success",
  cuantity: "No cuatity",
  icon: "fa-clipboard-list",
};

/* PROPTYPES */

SmallCard.propTypes = {
  atritutes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    cuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    icon: PropTypes.string.isRequired,
  }),
};

export default SmallCard;
