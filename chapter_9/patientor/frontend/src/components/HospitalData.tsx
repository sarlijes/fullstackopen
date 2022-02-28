import React from "react";
import { HospitalEntry } from "../types";
import { Card } from 'semantic-ui-react';
import BaseEntryData from "./BaseEntryData";

type EntryProps = {
  entry: HospitalEntry;
};

const HospitalData = ({ entry }: EntryProps) => {
  return (
    <Card fluid>
      <BaseEntryData entry={entry} />
      <Card.Content><strong>Description: </strong>
        {entry.description}</Card.Content>
    </Card>
  );
};
export default HospitalData;
