import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {

  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const description = calculateBmi(height, weight);

    res.send({
      weight: height,
      height: weight,
      bmi: description
    });
  } catch {
    res.status(404);
    res.send({
      error: "malformatted parameters"
    });
  }


});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});