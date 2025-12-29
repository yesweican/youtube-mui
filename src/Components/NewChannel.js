// NewChannel.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { CHANNEL_API_END_POINT } from '../config/constants.js';

function NewChannel() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData((prevData)=>({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleNewChannel = async (e) => {
    //alert("hello!");
    e.preventDefault(); // Prevents the page from refreshing
    console.log("Form Data:", formData);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        CHANNEL_API_END_POINT, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Token in header
          },
        }
      );

      console.log('Create Channel successful!', response.data);
    } catch (error) {
      console.log(`Create Channel failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleNewChannel} 
      display="flex" flexDirection="column" alignItems="center" p={4}>
      <h1>New Channel</h1>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        placeholder='Channel Name'
        sx={{width: 640}}
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        multiline
        placeholder='Channel Description'
        rows={8}
        variant="outlined"
        sx={{width: 640}}
        value={formData.description}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" color="primary" variant="contained" sx={{ mt: 3 }}>Submit</Button>
    </Box>
  );
}

export default NewChannel;