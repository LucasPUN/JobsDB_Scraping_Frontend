'use client'

import {FormEvent, useState} from "react";
import {
  Avatar,
  Box, Button,
  Container,
  CssBaseline, Divider,
  TextField,
  Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as FirebaseAuth from "@/lib/firebase/FirebaseAuthService";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {GoogleLoginButton} from "react-social-login-buttons";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const loginResult = await FirebaseAuth.handleSignInWithEmailAndPassword(data.get('email') as string, data.get('password') as string);
    if (loginResult) {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    const loginResult = await FirebaseAuth.handleSignInWithGoogle();
    if (loginResult) {
      router.push('/dashboard');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Box>
            <GoogleLoginButton
              style={{
                margin: 0,
                width: '100%',
              }}
              onClick={handleGoogleLogin}/>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}