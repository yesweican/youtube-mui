import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';

import { CHANNEL_API_END_POINT } from '../config/constants.js';

function MyChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchChannels = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");

        console.log("Fetching channels with token:", token);

        const res = await fetch(`${CHANNEL_API_END_POINT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch my channels');
        }

        const data = await res.json();
        console.log(data);
        setChannels(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Channels
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && channels.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No channels found.
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {channels.map((channel) => (
        <Grid item xs={12} key={channel._id}>
          <Card
            component={RouterLink}
            to={`/channels/${channel._id}`}
            sx={{
              textDecoration: "none",
              color: "inherit",
              height: "100%",
              transition: "box-shadow 0.2s ease",
              "&:hover": {
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {channel.name}
              </Typography>

              {channel.description && (
                <Typography variant="body2" color="text.secondary">
                  {channel.description}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MyChannels;