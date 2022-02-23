

const calculateBmi = (height: number, mass: number): String => {
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
      return ("Overweight (Pre-obese)")
    case (bmi >= 30):
      return ("Obese")
    default:
      throw new Error('Unknown BMI');
  }
}

console.log(calculateBmi(180, 74))
console.log(calculateBmi(180, 125))
console.log(calculateBmi(180, 50))