import React from "react";
import { Entry } from "../types";
import { useStateValue } from '../state';


type EntryProps = {
  entry: Entry;
};


const EntryDetails = ({ entry }: EntryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [{ diagnoses }] = useStateValue();
  console.log("🚀 ~ file: EntryDetails.tsx ~ line 14 ~ EntryDetails ~ diagnoses", diagnoses);
  return (
    <div className="health-bar">
      {entry.description}
    </div>
  );
};

export default EntryDetails;

{/* <Table.Cell>{e.diagnosisCodes?.map((code) =>
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  (diagnoses[code] !== undefined ? `${code} (${diagnoses[code].name})`
    : "")).join(", \n")} */}