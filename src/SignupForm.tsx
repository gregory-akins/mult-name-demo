import React from 'react';
import { useFormik } from 'formik';
import response from "./apiresponse.js";
import RecursiveContainer from './RecursiveContainer';
import { getYupSchemaFromMetaData } from './yupSchemaCreator';


const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log(formik, response)
  return (
    <form onSubmit={formik.handleSubmit}>
      <RecursiveContainer config={response} formik={formik} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;