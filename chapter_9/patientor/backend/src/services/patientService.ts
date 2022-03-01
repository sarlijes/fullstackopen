import patientData from '../../data/patients';
import { Patient, NewPatient } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const list = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(x => x.id === id);
  return patient;
};

const listNonSensitive = (): Omit<Patient, "ssn">[] => {
  const patients: Patient[] = list();
  return patients
    .map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }));
};

const addPatient = (entry: Omit<NewPatient, "id">): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries: list,
  addPatient: addPatient,
  getNonSensitiveEntries: listNonSensitive,
  findById
};