interface BMIValues {
  value1: number;
  value2: number;
}

const parseBMIArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, mass: number): string => {
  const heightM = height / 100;
  const bmi = mass / (heightM * heightM);

  switch (true) {
  case (bmi < 16.0):
    return "Underweight (Severe thinness)";
  case (bmi >= 16.0 && bmi <= 16.9):
    return "Underweight (Moderate thinness)";
  case (bmi >= 17.0 && bmi <= 18.4):
    return "Underweight (Mild thinness)";
  case (bmi >= 18.5 && bmi <= 24.9):
    return "Normal (healthy weight)";
  case (bmi >= 25.0 && bmi <= 29.9):
    return ("Overweight (Pre-obese)");
  case (bmi >= 30):
    return ("Obese");
  default:
    throw new Error("Unknown BMI");
  }
};

try {
  const { value1, value2 } = parseBMIArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}