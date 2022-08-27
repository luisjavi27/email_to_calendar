import React,{useState,useEffect,useRef} from 'react';


function ShowProducts(){

	const [products,setProducts] = useState([]);
	const [key,setKey] = useState('comedy');

	const inputTag = useRef();

	
	useEffect(()=>{
		const endpoint = `/api/products/`
		console.log('aqui estamo')
		fetch(endpoint, {
			method: 'GET',
			headers: new Headers({ 'Content-type': 'application/json'}),
			mode: 'no-cors'
		}).then(response => response.json())
		.then(data =>{
			if(!data.Error){
				setProducts(data);
			}else{
				// setProducts([]);
                // console.log('Algo salio mal: data.Error')
                // console.log(data.Error)
			}
		}).catch(error =>{console.log(error)});
	},[key]);

	const BuscarObjeto = async busqueda => {
		busqueda.preventDefault();
		const inputValue = inputTag.current.value;
		setKey(inputValue);
		inputTag.current.value='';
	}


	return(
		<div>
			{

				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={BuscarObjeto}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={inputTag}  type="text" className="form-control" />
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h3>El stock actual de bicis es de: {products.data.count}</h3>
							<h3>Mostrar La bici: {products.data.products[0].name}</h3>
							<h3>Mostrar La bici: {products.data.products[1].name}</h3>
							<h3>Mostrar La bici: {products.data.products[2].name}</h3>
							<h3>Usted esta en la pagina: {products.data.currentPage} de  {products.data.totalPages}</h3>
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default ShowProducts;