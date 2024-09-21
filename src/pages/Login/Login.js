import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import {signInWithEmailPassword} from '../../api/authAPI';
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
          const user = fetchUserData(userId);
          dispatch(login(user));
          navigate('/');
        } catch (error) {
          dispatch(loginFail(error));
        }
      };
    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin} >
                    <Box mb={2}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;