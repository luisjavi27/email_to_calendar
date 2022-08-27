import React from "react";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import Select from "./Select";

function Basic() {
  let destinos= ["Zipaquirá",
              "Villa de Leyva",
              "Chicaque",
              "Suesca"]
  // let [departments, setDepartments] = useState([]);
  // let [mucipes, setMucipes] = useState({});
  // let [dataDepMuc, setDataDepMuc] = useState([]);

  function handleChange(event) {
    // setMucipes({
    //   id: event.target.value,
    //   mucipes: dataDepMuc[event.target.value],
    // });
  }

  useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const listProm = await fetch(
  //         `https://www.datos.gov.co/resource/95qx-tzs7.json?$limit=2000`
  //       );
  //       const list = await listProm.json();

  //       let listDepartments = [];
  //       list.forEach((department) => {
  //         if (listDepartments[department.departamento] === undefined) {
  //           listDepartments[department.departamento] = [department.municipio];
  //         } else {
  //           listDepartments[department.departamento].push(department.municipio);
  //         }
  //       });
  //       setDataDepMuc(listDepartments);
  //       setDepartments(Object.keys(listDepartments).sort());
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
   }, []);

  return (
    <div className="d-sm-flex flex-column ">
      <h1 className=" col-lg-12 text-center align-items-center mb-5">
        Tu Buddy local
      </h1>
      <div section className="d-sm-flex align-items-center  ">
        <section className="d-sm-flex flex-column align-items-center">
        <iframe width="460" height="315" src="https://www.youtube.com/embed/ncpjXnoZF0M?controls=0" title="YouTube video player" frameBorder="0" allow="" allowFullScreen></iframe>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              idType: "",
              
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
              
            <Form className="d-sm-flex flex-column col-lg-8 form-control text-primary mt-5">
              <label className="ml-2 mr-2 mt-2" htmlFor="firstName">
                Nombre
              </label>
              <Field
                id="firstName"
                className="mb-2 ml-2 mr-2"
                name="firstName"
                
              />

              <label className="ml-2 mr-2 mt-2" htmlFor="lastName">
                Apellidos
              </label>
              <Field
                id="lastName"
                className="mb-2 ml-2 mr-2"
                name="lastName"
                              />

              <label className="ml-2 mr-2 mt-2" htmlFor="idType">
                Tipo de documento
              </label>
              <Field
                className="ml-2 mr-2 mb-2"
                id="idType"
                name="idType"
                as="select"
              >
                <option value="">Select..</option>
                <option value="passport">Passport</option>
                <option value="realId">Real ID</option>
                <option value="ssn">Social Security number</option>
              </Field>

              <label className="ml-2 mr-2 mt-2" htmlFor="idType">
                Fecha de tu viaje
              </label>
              <Field
                className="ml-2 mr-2 mb-2"
                id="idType"
                name="idType"
                type="date"
              />

              <label className="ml-2 mr-2 mt-2" htmlFor="department">
                Destino
              </label>
              <Field
                className="ml-2 mr-2 mb-2"
                id="destinos"
                name="destinos"
                as="select"
                // onChange={handleChange}
              >
                <option value="">Select..</option>
                {destinos.map((destino, i) => {
                  return (
                    <option value={destino} key={i}>
                      {destino}
                    </option>
                  );
                })}
              </Field>

              {/* <label className="ml-2 mr-2 mt-2" htmlFor="mucipes">
                Municipio
              </label>

              <Select {...mucipes} /> */}

              <label className="ml-2 mr-2 mt-2" htmlFor="email">
                Email
              </label>
              <Field
                className="ml-2 mr-2 mb-2"
                id="email"
                name="email"
                type="email"
              />
              <button className="btn ml-2 mr-2 mb-2 mt-4" type="submit">
                Enviar
              </button>
            </Form>
          </Formik>
        </section>
        <section className="d-sm-flex flex-column col-lg-6 align-items-center  "  style={{marginLeft:1+"rem"}}>
          <div style={{marginTop:-9+"rem"}}>
            <table className="table table-bordered text-primary mb-5" >
              <thead className="text-secondary">
                <tr>
                  <th colSpan="2" className=" "></th>
                  <th colSpan="5" className=" ">
                    Tiempo en horas
                  </th>
                </tr>
                <tr>
                  <td>Personas</td>
                  <td>Carro</td>
                  <td>2</td>
                  <td>4</td>
                  <td>6</td>
                  <td>8</td>
                  <td>10</td>
                </tr>
              </thead>
              <tbody>
               
                <tr>
                  <td>1-2</td>
                  <td>No</td>
                  <td>26</td>
                  <td>44</td>
                  <td>54</td>
                  <td>62</td>
                  <td>70</td>
                </tr>
                <tr>
                  <td>1-2</td>
                  <td>Si</td>
                  <td>56</td>
                  <td>100</td>
                  <td>132</td>
                  <td>152</td>
                  <td>170</td>
                </tr>
                <tr>
                  <td>3-4</td>
                  <td>No</td>
                  <td>30</td>
                  <td>52</td>
                  <td>66</td>
                  <td>74</td>
                  <td>82</td>
                </tr>
                <tr>
                  <td>3-4</td>
                  <td>Si</td>
                  <td>60</td>
                  <td>108</td>
                  <td>144</td>
                  <td>168</td>
                  <td>190</td>
                </tr>
                <tr>
                  <td colSpan="7">
                    *Los precios están en USD
                    <br />
                    *$7 USD para inicio antes de las 6 am o fin despues de las 9
                    pm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div> 
            <h3 className="text-secondary mb-4">Características del Servicio</h3>
              <ul className="text-primary"> 
                 <li className=" mb-3">
                No es un guía sino un amigo. Un local que conoce la ciudad muy bien y que quiere mostrartela, ayudarte y compartir contigo experiencias memorables
                </li>
                 <li className=" mb-3">
                Con un Buddy puedes hacer cualquier cosa que puedas hacer con un buen amigo a tu ritmo.
                </li>
                 <li className=" mb-3">
                Los gastos que se generan los asumes tu, transporte, entradas, comidas, bebidas, dependiendo de lo que quieras hacer.
                </li>
                 <li className=" mb-3">
                Puedes decidir compartir con tu Buddy dentro de la ciudad o en los alrededores. Somos muy flexibles ya que la idea de todo esto es que puedas aprovechar al máximo tu tiempo en Colombia de la forma en que más te guste.
                </li>
              </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

// ReactDOM.render(<Basic />, document.getElementById('root'));

export default Basic;
