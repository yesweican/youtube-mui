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

import { VIDEO_API_END_POINT } from '../config/constants.js';

function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");

        console.log("Fetching videos with token:", token);

        const res = await fetch(`${VIDEO_API_END_POINT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch My Video results');
        }

        const data = await res.json();
        console.log(data);
        setVideos(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Videos
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

      {!loading && !error && videos.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No videos found.
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video._id}>
            <Card sx={{ height: '100%' }}>
              {video.alterURL && (
                <CardMedia
                  component="img"
                  height="160"
                  image={video.alterURL}
                  alt={video.title}
                />
              )}

              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {video.title}
                </Typography>

                {video.description && (
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
                    {video.description}
                  </Typography>
                )}

                {video.channelId?.name && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 1 }}
                  >
                    Channel: {video.channelId.name}
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

export default MyVideos;