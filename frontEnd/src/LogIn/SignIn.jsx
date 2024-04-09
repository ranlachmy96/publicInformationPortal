import React, {useState} from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

import {LogIn} from '../API/Users.api.js';

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #1976d2;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    padding: 0;
    text-decoration: underline;
    text-decoration-color: rgba(25, 118, 210, 0.4);

    &:hover {
        text-decoration-color: inherit;
        color: #747bff;
    }

    &:focus {
        text-decoration-color: inherit;
        outline: none;
    }
`;

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/ranlachmy96/publicInformationPortal">
                Our GitHub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataForm = {
            user_name: data.get('userName'),
            password: data.get('password'),
        };
        const user = await LogIn(dataForm);
        if (user) {
            localStorage.setItem('token', user.token);
            navigate('/dashboard');
        } else {
            setErrorMsg('Invalid User Name or Password');
        }
    }

    async function handleGuest(event) {
        event.preventDefault();
        const dataForm = {
            user_name: 'Guest',
            password: '123',
        };
        const user = await LogIn(dataForm);
        localStorage.setItem('token', user.token);

        if (user) {
            navigate('/dashboard');
        }
    }

    function handleSignUp(event) {
        event.preventDefault();
        navigate('/signUp');
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h5" component="h2" sx={{color: '#0d4781'}} gutterBottom>
                        Public Information Portal
                    </Typography>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main', width: '100px', height: '100px'}}>
                        <img src='./Logo.png' alt='logo' width='130px' height='120px'/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Typography variant="body2" color="error" align="center">
                            {errorMsg}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid sx={{display: 'flex'}} item xs>
                                <StyledButton onClick={handleGuest} variant="body2">
                                    {"Enter as Guest"}
                                </StyledButton>
                            </Grid>
                            <Grid item>
                                <StyledButton onClick={handleSignUp} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}
