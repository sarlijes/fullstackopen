import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const list = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnose = () => {
  return "not implemented";
};

export default {
  getEntries: list,
  addDiagnose: addDiagnose
};