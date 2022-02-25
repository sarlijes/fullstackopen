import { Patient } from "../src/types";
import toNewPatient, { parseGender } from "../src/utils";

const data: Array<Patient> = [
  {
    "id": "12773336-f723-11e9-8f0b-362b9e155667",
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": parseGender("male"),
    "occupation": "New york city police officer",
    "entries": []
  },
  {
    "id": "22773598-f723-11e9-8f0b-362b9e155667",
    "name": "Martin Riggs",
    "dateOfBirth": "1979-01-30",
    "ssn": "300179-77A",
    "gender": parseGender("male"),
    "occupation": "Cop",
    "entries": []
  },
  {
    "id": "327736ec-f723-11e9-8f0b-362b9e155667",
    "name": "Hans Gruber",
    "dateOfBirth": "1970-04-25",
    "ssn": "250470-555L",
    "gender": parseGender("male"),
    "occupation": "Technician",
    "entries": []
  },
  {
    "id": "42773822-f723-11e9-8f0b-362b9e155667",
    "name": "Dana Scully",
    "dateOfBirth": "1974-01-05",
    "ssn": "050174-432N",
    "gender": parseGender("female"),
    "occupation": "Forensic Pathologist",
    "entries": []
  },
  {
    "id": "52773c6e-f723-11e9-8f0b-362b9e155667",
    "name": "Matti Luukkainen",
    "dateOfBirth": "1971-04-09",
    "ssn": "090471-8890",
    "gender": parseGender("male"),
    "occupation": "Digital evangelist",
    "entries": []
  }
];

const patientEntries: Patient[] = data.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patientEntries;