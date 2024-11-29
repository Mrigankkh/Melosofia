import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { fetchOtherUserData } from "../../api/userAPI";
import { getInterpretationsForUser } from "../../api/interpretationsAPI";
import { AuthContext } from "../../providers/AuthProvider";
const User = () => {
    const { username } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [interpretations, setInterpretations] = useState([]);
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        const fetchUserProfile = async () => {
            const details = await fetchOtherUserData(currentUser,username);
            console.log("User Details: ", details);
            setUserDetails(details);
            const userInterpretations = await getInterpretationsForUser(username);
            setInterpretations(userInterpretations || []);
            console.log("User Interpretations: ", interpretations);
            
 
        };
        fetchUserProfile();
    }, [username]);

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
            {/* Header Section */}
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
                        @{userDetails?.username}
                    </Typography>
                    <Typography variant="body1">{userDetails?.bio}</Typography>
                </Box>
            </Box>

            {/* Past Interpretations Section */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "800px",
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
                                <Typography variant="h6" color="white"> {interpretation.song[0].title}</Typography>
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
        </Box>
    );
};

export default User;
