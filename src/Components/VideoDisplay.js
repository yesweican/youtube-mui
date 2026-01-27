import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from "@mui/material";

import { VIDEO_API_END_POINT } from "../config/constants";

function VideoDisplay() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${VIDEO_API_END_POINT}/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load video");
        }

        const data = await res.json();
        setVideo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!video) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      {/* Video Player */}
      <Box sx={{ mb: 3 }}>
        <video
          src={video.videoURL}
          controls
          style={{
            width: "100%",
            maxHeight: 500,
            backgroundColor: "#000"
          }}
        />
      </Box>

      {/* Metadata */}
      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {video.title}
          </Typography>

          {video.description && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              {video.description}
            </Typography>
          )}

          {video.channelId && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Channel: {video.channelId.name || video.channelId}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default VideoDisplay;

