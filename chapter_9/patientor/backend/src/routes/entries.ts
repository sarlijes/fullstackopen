import express from 'express';
import entryService from '../services/entryService';
import { toNewEntry } from '../utils';

const entryRouter = express.Router();

entryRouter.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const added = entryService.addEntry(newEntry);
    res.json(added);
  } catch (e) {
    res.status(400).send("Something went wrong when adding new entry");
  }
});

export default entryRouter;