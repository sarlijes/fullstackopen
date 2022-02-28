import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon } from 'semantic-ui-react';
import BaseEntryData from "./BaseEntryData";

type EntryProps = {
  entry: OccupationalHealthcareEntry;
};

const OccupationalHealthCareData = ({ entry }: EntryProps) => {
  return (
    <Card fluid>
      <Card.Header>
        <Icon size="big" name='hospital' circular inverted color='teal' />
      </Card.Header>
      <BaseEntryData entry={entry} />
      <Card.Content><strong>Employer: </strong>{entry.employerName}</Card.Content>

      <Card.Content>
        {entry.sickLeave !== undefined ?
          `Sick leave: from ${entry.sickLeave.startDate} to ${entry.sickLeave.startDate}`
          : "-"}
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthCareData;