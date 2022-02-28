import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Table } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, getPatient } from '../state';

export const PatientDetails: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [{ patients }, dispatch] = useStateValue();
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const { id: id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPat = async function () {
      try {
        const { data: patientData } =
          await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`
          );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        dispatch(getPatient(patientData));
        setSelectedPatient(patientData);
      } catch (error) {
        console.log(error);
      }
    };
    if (patients[id] && patients[id].ssn) {
      setSelectedPatient(patients[id]);
    } else {
      void getPat();
    }
  }, [id]);

  if (!selectedPatient) {
    return null;
  }

  const entries = selectedPatient.entries;
  console.log("🚀 ~ file: PatientData.tsx ~ line 42 ~ entries", entries);

  return (
    <div>
      <h1>{selectedPatient.name}</h1>
      <h2>{selectedPatient.occupation}</h2>
      <div>SSN: {selectedPatient.ssn}</div>
      <div>{selectedPatient.gender}</div>
      <Container textAlign="center">
        <h3>Entries</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Diagnosis codes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {entries.map((e: Entry) => (
            <Table.Row key={e.id}>
              <Table.Cell>{e.date}</Table.Cell>
              <Table.Cell>{e.description}</Table.Cell>
              <Table.Cell>{e.diagnosisCodes?.join(", ")}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Link to={`/}`}>back</Link>
    </div>
  );
};

//date, description and diagnose codes of the patient's entries.