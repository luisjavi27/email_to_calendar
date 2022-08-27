import React from 'react';
import ChartRow from './ChartRow';
import { useEffect, useState } from "react";

function Chart (){
const [isLoading, setIsLoading] = useState(true);
const [dataProducts, setDataProducts] = useState(null);


useEffect(() => {
  const fetchData = async () => {
    try {
      const productsProm = await fetch(
        "http://localhost:3010/email/getEmails"
      );
      const products = await productsProm.json();
      setDataProducts(products.data);

      setIsLoading(null);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);

if (isLoading) {
  return (
    <div className="App">
      <h1>Cargando...</h1>
    </div>
  );
}

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Link</th>
                                <th>Detalle</th>
                               
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                            dataProducts.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;