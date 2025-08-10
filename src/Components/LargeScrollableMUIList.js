import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';

function LargeScrollableMUIList({ items }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: 400, // Adjust the height as needed
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LargeScrollableMUIList;