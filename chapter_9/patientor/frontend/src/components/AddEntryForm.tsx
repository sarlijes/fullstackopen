import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { Entry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from '../state';

export type EntryFormValues = Omit<Entry, "id" | "date">;

// interface Props {
//   onSubmit: (values: EntryFormValues) => void;
//   onCancel: () => void;
// }

// interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis['code']>;
//   type: string;
//   patientId: Patient['id'];
// }

const onSubmit = () => {
  console.log("submit");
  // const onSubmit = async (values: PatientFormValues) => {
  // try {
  //   const { data: newPatient } = await axios.post<Patient>(
  //     `${apiBaseUrl}/patients`,
  //     values
  //   );
  //   dispatch(addPatient(newPatient));
  //   closeModal();
  // } catch (e) {
  //   console.error('Unknown Error');
  //   setError('Unknown error');
  // }
};

const onCancel = () => {
  console.log("cancel");
};

// export const AddEntryForm = ({ onCancel }: Props) => {
export const AddEntryForm = () => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        patientId: "temp" // TODO
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="type"
              placeholder="type"
              name="type"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>

          </Form>
        );
      }}
    </Formik>
  );
};