import React from "react";
import { Field } from "formik";

function SmallCard(props) {
  if (props.mucipes === undefined) {
    return (
      <Field className="mb-2 ml-2 mr-2" id="idType" name="idType" as="select">
        <option value="">Select..</option>
     
      </Field>
    );
  } else {
    props.mucipes.sort();
    return (
      <Field className="mb-2 ml-2 mr-2" id={props.id} name={props.id} as="select">
        <option value="">Select..</option>
        {props.mucipes.map((mucipe, i) => {
              return (
                <option value={mucipe} key={i}>
                  {mucipe}
                </option>
              );
            })}
      </Field>
    );
  }
}

export default SmallCard;
