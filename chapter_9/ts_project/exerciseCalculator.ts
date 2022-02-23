interface ExerciseCalculatorValues {
  value1: number[];
  value2: number;
}

const parseArguments = (args: Array<string>): ExerciseCalculatorValues => {
  if (args.length < 10) throw new Error('Not enough arguments');
  console.log("🚀 ~ file: exerciseCalculator.ts ~ line 8 ~ parseArguments ~ args.length ", args.length)
  if (args.length > 10) throw new Error('Too many arguments');

  let trainingData = [];
  for (let i = 2; i < 9; i++) {
    const trimmed = args[i].replace("[", "").replace("]", "").replace(",", "");
    if (isNaN(Number(trimmed))) throw new Error('Must give training data as numbers, found:' + trimmed)
    trainingData.push(Number(trimmed))
  }
  const target = Number(args[9]);

  if (isNaN(target)) throw new Error('Must give target as number');

  return {
    value1: trainingData,
    value2: target
  }
}

const exerciseCalculator = (trainingData: number[], target: number) => {
  console.log("🚀 ~ file: exerciseCalculator.ts ~ line 28 ~ exerciseCalculator ~ target", target)
  console.log("🚀 ~ file: exerciseCalculator.ts ~ line 28 ~ exerciseCalculator ~ arr", trainingData)
  console.log("success")
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  exerciseCalculator(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

// { periodLength: 7,
//   trainingDays: 5,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.9285714285714286 }