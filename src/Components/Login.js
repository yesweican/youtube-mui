import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { AUTH_API_END_POINT } from '../config/constants.js';

function Login({ open, onClose, onLoginSuccess }) {
  const [loginUser, setLoginUser] = useState({
    username: '',
    password: '',
  });

  // === moved from Layout ===
  const handleLogInChange = (e) => {
    setLoginUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  // === moved from Layout ===
  const handleLogInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${AUTH_API_END_POINT}/login`,
        loginUser
      );

      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      onLoginSuccess(user);
      onClose();
    } catch (error) {
      console.log(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleLogInSubmit}>
        <DialogTitle>Login</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email (or Username)"
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            value={loginUser.username}
            onChange={handleLogInChange}
          />

          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            value={loginUser.password}
            onChange={handleLogInChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Login;
