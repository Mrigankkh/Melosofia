import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const AddInterpretationModal = ({ open, onClose, onSubmit }) => {
  const [interpretation, setInterpretation] = useState('');

  const handleSubmit = () => {
    onSubmit(interpretation); // Call the onSubmit prop with the interpretation
    setInterpretation(''); // Clear the input
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Your Interpretation</DialogTitle>
      <DialogContent>
        <TextField
          label="Your Interpretation"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={interpretation}
          onChange={(e) => setInterpretation(e.target.value)} // Update state on change
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!interpretation.trim()}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInterpretationModal;
