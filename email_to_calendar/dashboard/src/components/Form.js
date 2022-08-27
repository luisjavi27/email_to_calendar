import React from "react";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import Select from "./Select";

function Basic() {
  let [departments, setDepartments] = useState([]);
  let [mucipes, setMucipes] = useState([]);
  let [dataDepMuc, setDataDepMuc] = useState([]);

  function handleChange(event) {
    console.log(dataDepMuc)
    setMucipes({
      id: event.target.value,
      mucipes: dataDepMuc[event.target.value],
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const listProm = await fetch(
          `https://www.datos.gov.co/resource/95qx-tzs7.json?$limit=2000`
        );
        const list = await listProm.json();

        let listDepartments = [];
        list.forEach((department) => {
          if (listDepartments[department.departamento] === undefined) {
            listDepartments[department.departamento] = [department.municipio];
          } else {
            listDepartments[department.departamento].push(department.municipio);
          }
        });
        setDataDepMuc(listDepartments);
        setDepartments(Object.keys(listDepartments));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Sign Up</h1>
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
        <Form>
          <label htmlFor="firstName">Nombre</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          <label htmlFor="lastName">Apellidos</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="idType">Tipo de documento</label>
          <Field id="idType" name="idType" as="select">
            <option value="">Select..</option>

            <option value="passport">Passport</option>
            <option value="realId">Real ID</option>
            <option value="ssn">Social Security number</option>
          </Field>

          <label htmlFor="department">Departamento</label>
          <Field
            id="department"
            name="department"
            as="select"
            onChange={handleChange}
          >
            <option value="">Select..</option>
            {departments.map((department, i) => {
              return (
                <option value={department} key={i}>
                  {department}
                </option>
              );
            })}
          </Field>

          <label htmlFor="mucipes">Municipio</label>

                                 <Select { ...mucipes }/>

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="example@email.com"
            type="email"
          />
          <button type="submit">Enviar</button>
        </Form>
      </Formik>
    </div>
  );
}

// ReactDOM.render(<Basic />, document.getElementById('root'));

export default Basic;
