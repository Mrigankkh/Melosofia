import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    TextField,
    Modal,
    Paper,
    Tabs,
    Tab,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../api/userAPI"; // Assume this API exists
import { updateProfile, logout } from "../../store/authSlice"; // Assume this action exists
import { getInterpretationsForUser } from "../../api/interpretationsAPI"; // Assume this API exists
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    function handleLogout() {
        dispatch(logout());
        navigate("/");
    }
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
    });
    const [tabIndex, setTabIndex] = useState(0);
    const [interpretations, setInterpretations] = useState([]);

    useEffect(() => {
        const fetchUserInterpretations = async () => {
            const userInterpretations = await getInterpretationsForUser(
                user.username
            );
            setInterpretations(userInterpretations || []);
        };
        fetchUserInterpretations();
    }, [user.username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            // const updatedUser = await updateUserProfile(user._id, formData);
            // dispatch(updateProfile(updatedUser));
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
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
                        src={user.profilePicture || ""}
                        alt={user.name || "User"}
                        sx={{ width: 100, height: 100 }}
                    />
                    <Box>
                        <Typography variant="h4">{user.name}</Typography>
                        <Typography variant="subtitle1" color="gray">
                            @{user.username}
                        </Typography>
                        <Typography variant="body1">{user.bio}</Typography>
                        <Typography variant="body2" color="gray">
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    sx={{
                        marginTop: 4,
                        "& .MuiTab-root": {
                            fontSize: "1.25rem", // Increase font size
                            fontWeight: 600, // Make font bold
                            color: "#fff", // Tab text color
                        },
                        "& .MuiTab-root.Mui-selected": {
                            color: "#00bcd4", // Selected tab color
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#00bcd4", // Tab indicator color
                        },
                    }}
                >
                    <Tab label="Details" />
                    <Tab label="Interpretations" />
                </Tabs>
                {tabIndex === 0 && (
                    <Box sx={{ width: "100%", maxWidth: "800px", marginTop: 4 }}>
                        <Typography variant="h5">Profile Details</Typography>
                        <Typography variant="body1">{user.bio}</Typography>
                        <Typography variant="body2" color="gray">
                            {user.email}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsEditing(true)}
                            sx={{ marginTop: 2 }}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                            sx={{ marginTop: 2, marginLeft: 2 }}
                        >
                            Logout
                        </Button>
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box sx={{ width: "100%", maxWidth: "800px", marginTop: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Past Interpretations
                        </Typography>
                        {interpretations.length > 0 ? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                )}
            </Box>

            <Modal open={isEditing} onClose={() => setIsEditing(false)}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: 4,
                        width: "400px",
                        backgroundColor: "#333",
                        color: "#fff",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Edit Profile
                    </Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                    />
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 2,
                        }}
                    >
                        <Button onClick={() => setIsEditing(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default Profile;
