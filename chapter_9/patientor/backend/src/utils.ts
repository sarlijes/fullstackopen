import { NewPatient, Gender, Entry, Diagnosis, NewEntry } from './types';

// TODO rename to parseString
const parseName = (s: unknown): string => {
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
    name: parseName(name),
    dateOfBirth: parseName(dateOfBirth),
    ssn: parseName(ssn),
    gender: parseGender(gender),
    occupation: parseName(occupation),
    entries: parseEntries(entries)
  };
  return newEntry;
};

export const toNewEntry = ({ description, specialist,
  diagnosisCodes }: EntryFields): NewEntry => {
  const newEntry: NewEntry = {
    description: parseName(description),
    date: '2022-03-01', // TODO hard-coded
    specialist: parseName(specialist),
    diagnosisCodes: diagnosisCodes
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

type EntryFields = {
  description: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis['code']>;
};

// export default { toNewPatient, toNewEntry };