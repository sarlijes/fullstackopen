import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card } from 'semantic-ui-react';
import BaseEntryData from "./BaseEntryData";

type EntryProps = {
  entry: OccupationalHealthcareEntry;
};

const OccupationalHealthCareData = ({ entry }: EntryProps) => {
  return (
    <Card fluid>
      <BaseEntryData entry={entry} />
      <Card.Content><strong>Employer: </strong>{entry.employerName}</Card.Content>

      <Card.Content>
        {/* {entry.sickLeave !== undefined ? entry.sickLeave.startDate - entry.sickLeave.startDate : "Ei"} */}
        {entry.sickLeave !== undefined ?
          `Sick leave: from ${entry.sickLeave.startDate} to ${entry.sickLeave.startDate}`
          : "-"}
      </Card.Content>
      {/* <Card.Content><strong>Sick leave: </strong>{entry.sickLeave}</Card.Content> */}
    </Card>
  );
};

export default OccupationalHealthCareData;