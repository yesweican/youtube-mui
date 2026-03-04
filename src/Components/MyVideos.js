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

import { Link as RouterLink } from 'react-router-dom';
import { VIDEO_API_END_POINT } from '../config/constants.js';

function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const fetchVideos = async (pageNumber) => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch(
          `${VIDEO_API_END_POINT}?page=${pageNumber}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch My Videos");
        }

        const data = await res.json();
        console.log(data);

        setVideos(data.results || []);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos(page);
  }, [page, pageSize]);

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
            <Card
              sx={{ height: '100%' }}
              component={RouterLink}
              to={`/videoedit/${video._id}`}
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

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(e, value) => setPage(value - 1)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default MyVideos;