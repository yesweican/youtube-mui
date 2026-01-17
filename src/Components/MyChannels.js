import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
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
          <Grid item xs={12} sm={6} md={4} key={channel._id}>
            <Card sx={{ height: '100%' }}>
              {channel.alterURL && (
                <CardMedia
                  component="img"
                  height="160"
                  image={channel.alterURL}
                  alt={channel.title}
                />
              )}

              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {channel.title}
                </Typography>

                {channel.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {channel.description}
                  </Typography>
                )}

                {channel.channelId?.name && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 1 }}
                  >
                    Channel: {channel.channelId.name}
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