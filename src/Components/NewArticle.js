// RegistrationPage.js
import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box,  Typography, LinearProgress } from '@mui/material';
import { ARTICLE_API_END_POINT } from '../config/constants.js';

function NewArticle() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('tags', formData.tags);           
    data.append('file', file);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        ARTICLE_API_END_POINT, 
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Token in header
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentComplete = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentComplete);
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
      <Box sx={{ p: 4, textAlign: 'center' }}>
        {/* Hidden file input */}
        <input
          type="file"
          id="file-input"
          hidden
          onChange={handleFileChange}
        />

        {/* File chooser button */}
        <label htmlFor="file-input">
          <Button
            variant="contained"
            component="span"
            sx={{ mt: 2 }}
          >
            Choose File
          </Button>
        </label>

        {/* Selected file name */}
        {file && (
          <Typography sx={{ mt: 2 }}>
            {file.name}
          </Typography>
        )}

        {/* Upload progress */}
        {uploadProgress > 0 && (
          <Box sx={{ mt: 4 }}>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {uploadProgress}%
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          type="submit"
          id="submitBtn"
          name="submitBtn"
          variant="contained"
          color="success"
          disabled={!file}
          sx={{ px: 4, py: 1.5 }}
        >
          Submit
        </Button>
      </Box>

    </Box>
  );
}

export default NewArticle;