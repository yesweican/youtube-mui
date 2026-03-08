import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Grid,
  Pagination
} from '@mui/material';

import { SUBS_VIDEOS_API_END_POINT } from '../config/constants.js';

function SubscriptionVideos() {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
          `${SUBS_VIDEOS_API_END_POINT}?page=${page-1}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch subscription videos');
        }

        const data = await response.json();

        setVideos(data.results || []);
        setTotal(data.total || 0);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

  }, [page, pageSize]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Subscription Videos
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && videos.length === 0 && (
        <Typography>No videos found.</Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video._id}>
            <Card
              component={RouterLink}
              to={`/video/${video._id}`}
              sx={{ height: '100%' }}
            >
              {video.videoURL && (
                <CardMedia
                  component="video"
                  src={video.videoURL}
                  controls
                  preload="metadata"
                  sx={{ height: 160 }}
                />
              )}

              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
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
                  <Typography variant="caption" color="text.secondary">
                    Channel: {video.channelId.name}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default SubscriptionVideos;