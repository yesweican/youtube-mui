// RegistrationPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { AUTH_API_END_POINT } from '../config/constants.js';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname:'',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prevData)=>({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleCreateAccount = async (e) => {
    //alert("hello!");
    e.preventDefault(); // Prevents the page from refreshing
    console.log("Form Data:", formData);
    try {
      const response = await axios.post(AUTH_API_END_POINT+'/register', formData);
      console.log(`Registration successful! Welcome, ${response.data.name}`);
    } catch (error) {
      console.log(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleCreateAccount} 
      display="flex" flexDirection="column" alignItems="center" p={4}>
      <h1>Register</h1>
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        sx={{width: 360}}
        value={formData.username}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        sx={{width: 360}}
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Full Name"
        name="fullname"
        variant="outlined"
        sx={{width: 360}}
        value={formData.fullname}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        sx={{width: 360}}
        value={formData.password}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        variant="outlined"
        sx={{width: 360}}
        value={formData.confirmPassword}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" color="primary" variant="contained" sx={{ mt: 3 }}>Submit</Button>
    </Box>
  );
}

export default RegistrationPage;
