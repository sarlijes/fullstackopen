import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

interface ExerciseCalculatorValues {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {

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

app.post("/exercises", (req, res) => {
  try {
    const body = req.body;
    const validationResult = validateBody(req.body);
    if (validationResult.ok) {
      const result = exerciseCalculator(body.daily_exercises, body.target);
      res.send(result);
    } else {
      res.status(404);
      res.send(validationResult.error);
    }
  } catch {
    res.status(404);
    res.send({
      error: "malformatted request - something went wrong"
    });
  }
})

const validateBody = (body: ExerciseCalculatorValues) => {
  if (body.daily_exercises === undefined || body.target === undefined) {
    return {
      ok: false,
      error: "parameters missing"
    }
  }
  try {
    for (let i = 0; i < body.daily_exercises.length; i++) {
      let temp = Number(body.daily_exercises[i]);
      console.log(temp)
    }
    let temp2 = Number(body.target);
    console.log(temp2)

    return {
      ok: true
    }
  } catch {
    return {
      ok: false,
      error: "malformatted parameters"
    }
  }
}

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});