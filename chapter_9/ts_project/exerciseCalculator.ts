interface ExerciseCalculatorValues {
  value1: number[];
  value2: number;
}

const parseArguments = (args: Array<string>): ExerciseCalculatorValues => {
  if (args.length < 12) throw new Error('Not enough arguments');
  if (args.length > 12) throw new Error('Too many arguments');

  let trainingData = [];
  for (let i = 3; i < args.length; i++) {
    const trimmed = args[i].replace("[", "").replace("]", "").replace(",", "");
    if (isNaN(Number(trimmed))) throw new Error('Must give training data as numbers, found:' + trimmed)
    trainingData.push(Number(trimmed))
  }
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Must give target as number');

  return {
    value1: trainingData,
    value2: target
  }
}

const exerciseCalculator = (trainingData: number[], target: number) => {

  function getSum(total: number, num: number,) {
    return total + num;
  }
  const sum = trainingData.reduce(getSum, 0);
  const average = sum / trainingData.length;

  const trainingDays = trainingData.filter(day => day !== 0).length

  const result = {
    periodLength: trainingData.length,
    trainingDays: trainingDays,
    success: average >= target,
    rating: -1,
    ratingDescription: "",
    target: target,
    average: average
  }
  const ratings = new Map();

  ratings.set(1, "Nearly there!");
  ratings.set(2, "Good joob");
  ratings.set(3, "Take it easy!");

  if (average < target - 1) {
    result.rating = 1
  } else if (average > target + 1) {
    result.rating = 3
  } else {
    result.rating = 2
  }
  result.ratingDescription = ratings.get(result.rating);

  console.log(result)
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

