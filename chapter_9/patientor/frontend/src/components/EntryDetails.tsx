import React from "react";
import { Entry } from "../types";
import { useStateValue } from '../state';
import { Card } from 'semantic-ui-react';

type EntryProps = {
  entry: Entry;
};

const EntryDetails = ({ entry }: EntryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [{ diagnoses }] = useStateValue();
  return (
    <Card fluid>
      <Card.Header>{entry.date}</Card.Header>
      <Card.Meta>{entry.specialist}</Card.Meta>
      <Card.Content><strong>Description: </strong>
        {entry.description}</Card.Content>
      <Card.Content><strong>Diagnoses: </strong>
        {entry.diagnosisCodes?.map((code) =>
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        (diagnoses[code] !== undefined ? `${code} (${diagnoses[code].name})`
          : "")).join(", \n")}
      </Card.Content>
    </Card>
  );
};

export default EntryDetails;