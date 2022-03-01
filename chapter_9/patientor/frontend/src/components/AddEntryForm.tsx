import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { Entry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue, addEntry } from '../state';
import { apiBaseUrl } from "../constants";

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

// export const AddEntryForm = ({ onCancel }: Props) => {
export const AddEntryForm = () => {
  const [{ patients: patients }, dispatch] = useStateValue();
  console.log(patients.size);
  const { id: patientId } = useParams<{ id: string }>();

  const onSubmit = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      // closeModal();
    } catch (e) {
      console.error('Unknown Error');
      // setError('Unknown error');
    }
  };

  const onCancel = () => {
    console.log("cancel");
  };


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