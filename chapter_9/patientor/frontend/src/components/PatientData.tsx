import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, getPatient } from '../state';
import EntryDetails from './EntryDetails';

export const PatientDetails: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const { id: id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPat = async function () {
      try {
        const { data: patientData } =
          await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`
          );
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

  return (
    <div>
      <h1>{selectedPatient.name}</h1>
      <h2>{selectedPatient.occupation}</h2>
      <div>SSN: {selectedPatient.ssn}</div>
      <div>{selectedPatient.gender}</div>
      <h2>Entries</h2>
      <Card.Group>
        {entries.map((e: Entry) => (
          <EntryDetails key={e.id} entry={e} />
        ))}
      </Card.Group>
      <Link to={`/}`}>back</Link>
    </div >
  );
};