
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import LargeScrollableMUIList from './LargeScrollableMUIList';

function HorizontalMUITabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    // Add more items as needed
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Tabs value={activeTab} onChange={handleChange} aria-label="horizontal tabs">
        <Tab label="Tab One" value={0} />
        <Tab label="Tab Two" value={1} />
        <Tab label="Tab Three" value={2} />
      </Tabs>

      <Box sx={{ p: 3, textAlign: 'center', width: '100%' }}>
        {activeTab === 0 && <Typography>Content for Tab One <LargeScrollableMUIList items={items}/> </Typography>}
        {activeTab === 1 && <Typography>Content for Tab Two <LargeScrollableMUIList items={items}/> </Typography>}
        {activeTab === 2 && <Typography>Content for Tab Three <LargeScrollableMUIList items={items}/> </Typography>}
      </Box>
    </Box>
  );
}

export default HorizontalMUITabs;
