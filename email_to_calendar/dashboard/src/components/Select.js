import React from "react";
import { Field } from "formik";

function SmallCard(props) {
  if (props.mucipes == undefined) {
    return (
      <Field id="idType" name="idType" as="select">
        <option value="">Select..</option>
     
      </Field>
    );
  } else {
    return (
      <Field id={props.id} name={props.id} as="select">
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
