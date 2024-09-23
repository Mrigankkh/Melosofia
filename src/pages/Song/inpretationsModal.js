import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useSelector } from "react-redux";
import {addInterpretation} from  '../../api/interpretationsAPI';
const AddInterpretationModal = ({ open, onClose, onSubmit }) => {
  const [interpretation, setInterpretation] = useState('');
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async () => {
    await addInterpretation({ interpretation, songId: open.songId, userId: user.id });
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
