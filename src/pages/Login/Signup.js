
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpWithEmailPassword } from '../../api/authAPI';
import { signup, signupFail } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../api/userAPI';
import { toast } from 'react-toastify';
import '../../App.css';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignup = async (e) => {
        try {
            e.preventDefault();
            const userId = await signUpWithEmailPassword(formData.name, formData.email, formData.password);
            const user = await fetchUserData(userId);
            dispatch(signup(user));
            navigate('/');
        } catch (error) {
            toast.error(error.message);
            dispatch(signupFail(error));
        }
    };

    return (
        <Box
           className="auth-page"
        >
            
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
                    <Typography  className='auth-heading' variant="h4" component="h1" >
                        Create an Account
                    </Typography>
                    <Typography variant="body1" className='auth-sub-heading'>
                        Join our community and explore the beauty of lyrics.
                    </Typography>
                    <form onSubmit={handleSignup}>
                        <TextField
                            className='auth-input'
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
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
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
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
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
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
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                          className='auth-btn'
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login" underline="none" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            
        </Box>
    );
};

export default Signup;
