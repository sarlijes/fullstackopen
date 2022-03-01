import { NewPatient, Gender, Entry, Diagnosis, NewEntry, Patient } from './types';

// TODO rename to parseString
const parseString = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Incorrect or missing information');
  }
  return s;
};

const isGender = (str: string): str is Gender => {
  return ['female', 'male', 'other'].includes(str);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isArray = (arr: unknown): arr is Array<Entry> => {
  return arr instanceof Array;
};

export const parseEntries = (entries: unknown): Entry[] => {
  if (entries === undefined) {
    return [];
  }
  if (!isArray(entries)) {
    throw new Error('Cannot parse entries');
  }
  return entries;
};

export const toNewPatient = ({ name, dateOfBirth, ssn,
  gender, occupation, entries }: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries)
  };
  return newEntry;
};

export const toNewEntry = ({ description, specialist,
  diagnosisCodes, type, patientId }: EntryFields): NewEntry => {
  const newEntry: NewEntry = {
    description: parseString(description),
    date: '2022-03-01', // TODO hard-coded
    specialist: parseString(specialist),
    diagnosisCodes: diagnosisCodes,
    type: parseString(type),
    patientId: patientId
  };
  return newEntry;
};

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown
};

export type EntryFields = {
  description: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis['code']>;
  type: string;
  patientId: Patient['id'];
  // TODO link to Patient
};

// export default { toNewPatient, toNewEntry };