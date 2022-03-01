import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import entryRouter from './routes/entries';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);
app.use('/api/patients/:id/entries', entryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});