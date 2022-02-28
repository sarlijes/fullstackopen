import React from "react";
import { Entry } from "../types";
import OccupationalHealthCareData from "./OccupationalHealthCareData";
import HospitalData from "./HospitalData";
import HealthCheckData from "./HealthCheckData";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareData entry={entry} />;
    case 'Hospital':
      return <HospitalData entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckData entry={entry} />;
    default:
      return assertNever(entry);
  }
};


export default EntryDetails;