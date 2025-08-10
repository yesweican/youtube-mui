import React, { useState } from 'react';
import { TextField, Button, Box, ImageList, ImageListItem } from '@mui/material';

function ScrollableImageList({ images }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter images based on search term (if needed)
  //const filteredImages = images.filter((image) =>
  //  image.title.toLowerCase().includes(searchTerm.toLowerCase())
  //);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    // You can add additional search logic here if needed
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      {/* Top Section: Search Bar */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Search images..."
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Bottom Section: Scrollable Image List */}
      <Box
        sx={{
          maxHeight: 400,
          overflowY: 'auto',
          mt: 2,
        }}
      >
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}

export default ScrollableImageList;