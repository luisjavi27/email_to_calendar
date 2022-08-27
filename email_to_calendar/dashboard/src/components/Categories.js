import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCategories, setDataCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesProm = await fetch(
          "http://localhost:3010/email/getEmails"
        );
        const categories = await categoriesProm.json();
        setDataCategories(categories.data);
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
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Productos por Categoria</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {dataCategories.categories.map((data, i) => {
              return (
               
                <div className="col-lg-6 mb-4" key={i}>
                   <Link to={data.detail}>
                  <div className="card bg-dark text-white shadow">
                
                  </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
