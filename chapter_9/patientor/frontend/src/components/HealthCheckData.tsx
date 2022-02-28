import React from "react";
import { HealthCheckEntry } from "../types";
import { Card } from 'semantic-ui-react';
import HealthRatingBar from "./HealthRatingBar";
import BaseEntryData from "./BaseEntryData";

type EntryProps = {
  entry: HealthCheckEntry;
};

const HealthCheckData = ({ entry }: EntryProps) => {
  return (
    <Card fluid>
      <BaseEntryData entry={entry} />
      <Card.Content>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckData;