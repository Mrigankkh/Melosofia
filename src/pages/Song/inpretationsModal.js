import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { addInterpretation } from "../../api/interpretationsAPI";
const AddInterpretationModal = ({ open, onClose, song_id }) => {
  const [interpretation, setInterpretation] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async () => {
    const user_id = user._id;
    console.log(
      "User ID: ",
      user._id,
      "Song ID: ",
      song_id,
      "Interpretation: ",
      interpretation
    );
    await addInterpretation(interpretation, song_id, user);
    onClose();
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
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!interpretation.trim()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInterpretationModal;
