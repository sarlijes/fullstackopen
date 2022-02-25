import patientData from '../../data/patients';
import { Patient } from '../types';

const patients: Array<Patient> = patientData;

const list = (): Array<Patient> => {
  return patients;
};

const listNonSensitive = (): Omit<Patient, "ssn">[] => {
  const patients: Patient[] = list();
  return patients
    .map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
};

const addPatient = () => {
  return "not implemented";
};

export default {
  getEntries: list,
  addPatient: addPatient,
  getNonSensitiveEntries: listNonSensitive
};