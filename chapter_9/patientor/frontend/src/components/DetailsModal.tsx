import React from 'react';
import { Modal } from 'semantic-ui-react';
import { Patient } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  patient: Patient
}

const ViewDetailsModal = ({ modalOpen, onClose, patient }: Props) => (

  < Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Patient details</Modal.Header>
    <Modal.Content>
      {console.log("🚀 ~ file: DetailsModal.tsx ~ line 12 ~ patient", patient)}
      <h1>{patient.name}</h1>
      <h2>{patient.occupation}</h2>
      <div>SSN: {patient.ssn}</div>
      <div>{patient.gender}</div>
    </Modal.Content>
  </Modal >
);

export default ViewDetailsModal;
