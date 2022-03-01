import express from 'express';
import patientService from '../services/patientService';
import entryService from '../services/entryService';
import { toNewPatient, toNewEntry } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const added = patientService.addPatient(newPatient);
    res.json(added);
  } catch (e) {
    res.status(400).send("Something went wrong when adding new patient");
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const added = entryService.addEntry(newEntry);
    res.json(added);
  } catch (e) {
    res.status(400).send("Something went wrong when adding new entry");
  }
});

export default patientRouter;