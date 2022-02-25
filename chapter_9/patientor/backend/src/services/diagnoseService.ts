import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const list = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiagnose = () => {
  return "not implemented";
};

export default {
  getEntries: list,
  addDiagnose: addDiagnose
};