import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowOneProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productProm = await fetch(
          `http://localhost:3010/api/products/${id}`
        );

        const product = await productProm.json();
        console.log('product')
        console.log(product)
        setDataProduct(product.data)

        setIsLoading(null);
      } catch (err) {

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
          <h5 className="m-0 font-weight-bold text-gray-800">{dataProduct.name}</h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={dataProduct.images[0]} alt=" Una bicicleta " />
          </div>
          <p> {dataProduct.name}</p>
          <p>Precio: {dataProduct.price}</p>
          <p>Descripcion: {dataProduct.description}</p>
          <p>Stock: {dataProduct.stock}</p>
          <p>Tamaños disponibles: {dataProduct.Product_Size.map((size, i) =>{return(<p>{size.Size}</p>)})}</p>
          <p>Colores disponibles: {dataProduct.product_Color.map((color, i) =>{return(<p>{color.color}</p>)})}</p>
          {/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Detalles de este producto</a> */}
        </div>
      </div>
    </div>
  );
}

export default ShowOneProduct;
