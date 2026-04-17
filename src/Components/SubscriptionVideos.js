import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
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

import { SUBS_VIDEOS_API_END_POINT } from '../config/constants.js';

function SubscriptionVideos() {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0); // ✅ 0-based
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 10;

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false);

  const fetchVideos = useCallback(async (pageToFetch) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Please log in.");
        isFetchingRef.current = false;
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${SUBS_VIDEOS_API_END_POINT}?page=${pageToFetch}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const data = await response.json();
      const newVideos = data.results || [];
      const total = data.total || 0;

      // ✅ Deduplication
      setVideos((prev) => {
        const existingIds = new Set(prev.map(v => v._id));
        const filtered = newVideos.filter(v => !existingIds.has(v._id));
        return [...prev, ...filtered];
      });

      // ✅ Determine if more data exists
      setHasMore((pageToFetch + 1) * pageSize < total);

    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // 🔁 Fetch when page changes
  useEffect(() => {
    fetchVideos(page);
  }, [page, fetchVideos]);

  // 👁️ IntersectionObserver (sentinel)
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
          setPage(prev => prev + 1);
        }
      },
      {
        rootMargin: "200px"
      }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Subscription Videos
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && videos.length === 0 && (
        <Typography>No videos found.</Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} key={video._id}>
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
                  sx={{ height: 180 }}
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

      {/* 🔻 Sentinel */}
      <Box ref={sentinelRef} sx={{ height: 40 }} />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!hasMore && videos.length > 0 && (
        <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
          No more videos
        </Typography>
      )}
    </Box>
  );
}

export default SubscriptionVideos;