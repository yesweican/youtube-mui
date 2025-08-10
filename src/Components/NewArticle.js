// RegistrationPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { ARTICLE_API_END_POINT } from '../config/constants.js';

function NewArticle() {
  const [formData, setFormData] = useState({
    title: '',
    details: ''
  });

  const handleChange = (e) => {
    setFormData((prevData)=>({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleNewArticle = async (e) => {
    //alert("hello!");
    e.preventDefault(); // Prevents the page from refreshing
    console.log("Form Data:", formData);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        ARTICLE_API_END_POINT, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Token in header
          },
        }
      );

      console.log('Create Article successful!', response.data);
    } catch (error) {
      console.log(`Create Article failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleNewArticle} 
      display="flex" flexDirection="column" alignItems="center" p={4}>
      <h1>New Article</h1>
      <TextField
        label="Title"
        name="title"
        variant="outlined"
        placeholder='Article Title'
        sx={{width: 640}}
        value={formData.title}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Details"
        name="details"
        multiline
        placeholder='Article Detailes'
        rows={8}
        variant="outlined"
        sx={{width: 640}}
        value={formData.details}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" color="primary" variant="contained" sx={{ mt: 3 }}>Submit</Button>
    </Box>
  );
}

export default NewArticle;