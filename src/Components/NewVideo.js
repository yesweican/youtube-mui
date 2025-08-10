// NewArticle.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, LinearProgress, Typography} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VIDEO_API_END_POINT } from '../config/constants.js';

function NewVideo() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags:''
  });

  const handleChange = (e) => {
    setFormData((prevData)=>({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleNewVideo = async (e) => {
    //alert("hello!");
    e.preventDefault(); // Prevents the page from refreshing
    console.log("Form Data:", formData);
    try {
      if (!file) return;
      formData.append('file', file);

      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        VIDEO_API_END_POINT, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Token in header
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

      console.log('Create Video successful!', response.data);
    } catch (error) {
      console.log(`Create Video failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleNewVideo} 
      display="flex" flexDirection="column" alignItems="center" p={4}>
      <h1>New Video</h1>
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
        label="Description"
        name="description"
        multiline
        placeholder='Description'
        rows={4}
        variant="outlined"
        sx={{width: 640}}
        value={formData.description}
        onChange={handleChange}
        margin="normal"
      />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6">Upload Your File</Typography>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Choose File
          </Button>
        </label>
        {file && <Typography>{file.name}</Typography>}
        {uploadProgress > 0 && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography>{uploadProgress}%</Typography>
          </Box>
        )}
      </Box>
      <Button 
       type="submit"
       color="primary"
       variant="contained"
       disabled={!file}       
       sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
}

export default NewVideo;