import { Entry, NewEntry } from '../types';
import patientService from '../services/patientService';
import { v1 as uuid } from 'uuid';

const addEntry = (entry: Omit<NewEntry, "id">): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patient = patientService.findById(newEntry.patientId);
  if (patient === undefined) {
    throw new Error('No patient found with id ' + newEntry.patientId);
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  addEntry: addEntry,
};