import { Entry, NewEntry } from '../types';

import { v1 as uuid } from 'uuid';

const entries: Array<Entry> = [];

const addEntry = (entry: Omit<NewEntry, "id">): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  entries.push(newEntry);
  return newEntry;
};

export default {
  addEntry: addEntry,
};