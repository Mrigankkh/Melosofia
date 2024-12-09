import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../api/userAPI";
import { getInterpretationsForUser } from "../../api/interpretationsAPI";
import { AuthContext } from "../../providers/AuthProvider";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import {updateUserData} from "../../api/userAPI";
const User = () => {
  const [userDetails, setUserDetails] = useState({});
  const [interpretations, setInterpretations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }
  useEffect(() => {
    const fetchUserProfile = async () => {
      const details = await fetchUserData(currentUser);
      setUserDetails(details);
      const userInterpretations = await getInterpretationsForUser(details.name);
      setInterpretations(userInterpretations || []);
    };
    fetchUserProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateUserData(currentUser, userDetails);
    setEditMode(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#000",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/stardust.png")',
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          marginBottom: 4,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Avatar
          src={userDetails?.profilePicture || ""}
          alt={userDetails?.name || "User"}
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <Typography variant="h4">{userDetails?.name}</Typography>
          <Typography variant="subtitle1" color="gray">
            Member Since:{" "}
            {new Date(userDetails?.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">{userDetails?.bio}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", maxWidth: "800px", position: "relative" }}>
        <Typography variant="h5" gutterBottom>
          Additional Info
        </Typography>

        {/* Position the Edit/Save Icon above the fields */}
        <IconButton
          sx={{
            position: "absolute", // Absolute position within this box
            right: 0, // Align to the right of the container
            top: -30, // Position it above the fields, adjust as needed
            color: "white", // Set icon color to white
            backgroundColor: "transparent", // Transparent background
            "&:hover": {
              backgroundColor: "#333", // Light dark background on hover
            },
            "&:active": {
              backgroundColor: "#444", // Slightly darker when clicked
            },
            borderRadius: "50%", // Rounded corners for the button
            padding: 1, // Adjust padding for the icon's size and positioning
          }}
          onClick={() => {
            if (editMode) {
              handleSave(); // Call handleSave when Save icon is clicked
            }
            setEditMode(!editMode); // Toggle edit mode
          }}
        >
          {editMode ? <SaveIcon /> : <EditIcon />}
        </IconButton>

        {/* Editable Fields */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {editMode ? (
            <>
              <TextField
                label="Favorite Song"
                name="favoriteSong"
                value={userDetails.favoriteSong || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#61dafb" },
                    "&.Mui-focused fieldset": { borderColor: "#61dafb" },
                  },
                }}
              />
              <TextField
                label="Favorite Artist"
                name="favoriteArtist"
                value={userDetails.favoriteArtist || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#61dafb" },
                    "&.Mui-focused fieldset": { borderColor: "#61dafb" },
                  },
                }}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1">Favorite Song</Typography>
              <Typography variant="body1">
                {userDetails.favoriteSong}
              </Typography>
              <Typography variant="subtitle1">Favorite Artist</Typography>
              <Typography variant="body1">
                {userDetails.favoriteArtist}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          marginTop: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Past Interpretations
        </Typography>
        {interpretations.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {interpretations.map((interpretation) => (
              <Paper
                key={interpretation.id}
                elevation={3}
                sx={{
                  padding: 2,
                  backgroundColor: "#1e1e1e",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" color="white">
                  {interpretation.song[0].title}
                </Typography>
                <Typography variant="body2" color="lightgray">
                  {new Date(interpretation.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" mt={1} color="white">
                  {interpretation.interpretation_text}
                </Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography>No interpretations yet.</Typography>
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            width: "25%", 
            height: 50, // Height of the rectangular button
            backgroundColor: "transparent",
            color: "white", // White text color
            border: "1px solid white", // White border
            "&:hover": {
              backgroundColor: "#333", // Dark background on hover
              color: "white", // Keep text white on hover
            },
            "& .MuiButton-label": {
              textTransform: "none", 
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default User;
