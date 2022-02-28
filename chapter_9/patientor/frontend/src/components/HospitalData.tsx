import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon } from 'semantic-ui-react';
import BaseEntryData from "./BaseEntryData";

type EntryProps = {
  entry: HospitalEntry;
};

const HospitalData = ({ entry }: EntryProps) => {
  return (
    <Card fluid>
      <Card.Header>
        <Icon size="big" name='briefcase' circular inverted color='teal' />
      </Card.Header>
      <BaseEntryData entry={entry} />
      <Card.Content><strong>Description: </strong>
        {entry.description}</Card.Content>
    </Card>
  );
};
export default HospitalData;
