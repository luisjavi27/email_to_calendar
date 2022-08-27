import React from "react";
import { Link } from "react-router-dom";

function ChartRow(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <Link to={props.link} >
          <li>"LINK"</li>
        </Link>
      </td>
      <td>
        
          <button variant="contained" color="link">
            Detalle
          </button>
        
      </td>
    </tr>
  );
}

export default ChartRow;
