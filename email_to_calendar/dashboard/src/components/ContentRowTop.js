import React from "react";
import {  Route, Routes } from "react-router-dom";

import Chart from "./Chart";
import Categories from "./Categories";
import ShowOneProduct from "./ShowOneProduct";
import Form from "./Form";

function ContentRowTop() {
  return (
    <React.Fragment>
      {/*<!-- Content Row Top -->*/}
      <div className="container-fluid">
        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800" id="algo">
            Colombian Quest!
          </h1>
        </div>
        <Routes>
          <Route path="/correos" element={<Chart />}/>
          <Route path="/products/:id" element={<ShowOneProduct />}/>
          <Route path="/labels" element={<Categories />}/>
          <Route path="/form" element={<Form />}/>
        </Routes>
      </div>
      {/*<!--End Content Row Top-->*/}
    </React.Fragment>
  );
}
export default ContentRowTop;
