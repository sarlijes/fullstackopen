import React from "react";
import { HealthCheckEntry } from "../types";
import { Card, Icon } from 'semantic-ui-react';
import HealthRatingBar from "./HealthRatingBar";
import BaseEntryData from "./BaseEntryData";

type EntryProps = {
  entry: HealthCheckEntry;
};

const HealthCheckData = ({ entry }: EntryProps) => {
  return (
    <Card fluid>
      <Card.Header>
        <Icon size="big" name='check circle' circular inverted color='teal' />
      </Card.Header>
      <BaseEntryData entry={entry} />
      <Card.Content>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckData;