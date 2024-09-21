import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signUpWithEmailPassword} from '../../api/authAPI';
import { signup, signupFail } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../api/userAPI';
import { toast } from 'react-toastify';
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
             
             const user  = fetchUserData(userId)
            dispatch(signup(user));
            navigate('/');
        } catch (error) {
            // Inside handleSignup catch block
            toast.error(error.message);
            dispatch(signupFail(error));
        }
    };
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSignup}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
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
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login">
                            Log in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;