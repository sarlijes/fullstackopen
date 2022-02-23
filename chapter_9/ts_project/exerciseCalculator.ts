interface ExerciseCalculatorValues {
  value1: number[];
  value2: number;
}

const parseArguments = (args: Array<string>): ExerciseCalculatorValues => {
  if (args.length < 10) throw new Error('Not enough arguments');
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

  function getSum(total: number, num: number,) {
    return total + num;
  }
  const sum = trainingData.reduce(getSum, 0);
  const average = sum / trainingData.length;

  const result = {
    periodLength: -1,
    success: false,
    rating: -1,
    ratingDescription: "",
    target: -1,
    average: -1.0
  }

  const ratings = new Map();

  ratings.set(1, "Nearly there!");
  ratings.set(2, "Good joob");
  ratings.set(3, "Take it easy!");

  result.periodLength = trainingData.length;
  result.success = average >= target;

  if (average < target - 1) {
    result.rating = 1
  } else if (average > target + 1) {
    result.rating = 3
  } else {
    result.rating = 2
  }

  result.ratingDescription = ratings.get(result.rating);
  result.target = target;
  result.average = average;

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

