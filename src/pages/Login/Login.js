import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signInWithEmailPassword } from '../../api/authAPI';
import { login, loginFail } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../api/userAPI';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            console.log('Trying to sign in user with email: ', email); 
            const userId = await signInWithEmailPassword(email, password);
            const user = await fetchUserData(userId);
            console.log('User signed in isss: ', user);
            dispatch(login(user));
            navigate('/');
        } catch (error) {
            dispatch(loginFail(error));
        }
    };

    return (
            <Box className= 'auth-page'>
                <Container maxWidth="sm">
                <Paper
                
                elevation={12} // Higher elevation for a more pronounced shadow
                sx={{
                    backdropFilter: 'blur(1px)', // Slightly blurred background
                    padding: '40px',
                    borderRadius: '16px', // Increased border radius for a smoother look
                    backgroundColor: '#222', // Slightly lighter than black to add contrast
                    color: '#fff',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)', // Softer, more subtle shadow
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
                    
                }}
            >
                <Typography variant="h4" component="h2"  className='auth-heading'>
                    Login
                </Typography>
                <Typography variant="body1" className='auth-sub-heading'>
                    Explore the beauty of lyrics.
                    </Typography>
                <form onSubmit={handleLogin}>
                    <Box mb={2}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            slotProps ={{
                                input:{ sx: {
                                    color: '#fff',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                }},
                               inputLabel: {sx:  { color: '#fff' }},

                            }}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            slotProps ={{
                                input:{ sx: {
                                    color: '#fff',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                }},
                               inputLabel: {sx:  { color: '#fff' }},

                            }}
                        />
                    </Box>
                    <Button type="submit" variant="contained" className='auth-btn' fullWidth>
                        Login
                    </Button>
                </form>
                <Box mt={2}>
                    <Typography variant="body2">
                        Don't have an account? <Link href="/signup" underline="none" sx={{ color: '#fff', fontWeight: 'bold' }}>Sign up</Link>
                    </Typography>
                    
                </Box>
                </Paper>
                </Container>
            </Box>
    );
};

export default Login;