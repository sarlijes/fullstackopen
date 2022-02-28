import React from "react";
import { Entry } from "../types";
import { useStateValue } from '../state';
import { Card } from 'semantic-ui-react';

type EntryProps = {
  entry: Entry;
};

const BaseEntryData = ({ entry }: EntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <Card.Content>{entry.date}</Card.Content>
      <Card.Content><strong>Specialist: </strong>{entry.specialist}</Card.Content>
      <Card.Content><strong>Description: </strong>
        {entry.description}</Card.Content>
      <Card.Content><strong>Diagnoses: </strong>
        {
          entry.diagnosisCodes?.map((code) =>
          (diagnoses[code] !== undefined ? `${code} (${diagnoses[code].name})`
            : "")).join(", \n")
        }
      </Card.Content>
    </>
  );
};
export default BaseEntryData;
