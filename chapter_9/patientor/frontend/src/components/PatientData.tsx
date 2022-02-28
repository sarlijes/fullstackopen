import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Patient } from '../types';
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
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`
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
  return (
    <div>
      <h1>{selectedPatient.name}</h1>
      <h2>{selectedPatient.occupation}</h2>
      <div>SSN: {selectedPatient.ssn}</div>
      <div>{selectedPatient.gender}</div>
      <Link to={`/}`}>back</Link>
    </div>
  );
};