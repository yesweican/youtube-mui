import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from "react-router-dom";
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

import { CHANNEL_VIDEOS_API_END_POINT } from '../config/constants.js';

function ChannelVideos() {
  const { id } = useParams();

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);        // 0-based (backend)
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(total / pageSize);

  // Reset page when channel changes
  useEffect(() => {
    setPage(0);
  }, [id]);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${CHANNEL_VIDEOS_API_END_POINT}/${id}?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch channel videos");
        }

        const data = await res.json();

        setVideos(data.results || []);
        setTotal(data.total || 0);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChannelVideos();
    }

  }, [id, page, pageSize]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Channel Videos
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
          <Grid item xs={12} key={video._id}>
            <Card
              component={RouterLink}
              to={`/video/${video._id}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                height: "100%",
                transition: "box-shadow 0.2s ease",
                "&:hover": { boxShadow: 6 }
              }}
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
                <Typography variant="h6" gutterBottom>
                  {video.title}
                </Typography>

                {video.description && (
                  <Typography variant="body2" color="text.secondary">
                    {video.description}
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
            page={page + 1}                 // convert to 1-based
            onChange={(e, value) => {
              setPage(value - 1);           // convert back to 0-based
            }}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default ChannelVideos;