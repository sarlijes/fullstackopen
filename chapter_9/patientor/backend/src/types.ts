export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type Gender = 'female' | 'male' | 'other' | 'notKnown';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;