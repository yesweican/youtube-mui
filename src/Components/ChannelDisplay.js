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

import { CHANNEL_API_END_POINT } from "../config/constants";

function ChannelDisplay() {
  const { id } = useParams();

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${CHANNEL_API_END_POINT}/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load channel");
        }

        const data = await res.json();

        console.log(data);

        setChannel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
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

  console.log(channel);
  if (!channel) {
    console.log("No channel found");
    return null;
  } 

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      {/* Metadata */}
      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {channel.name}
          </Typography>

          {channel.description && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              {channel.description}
            </Typography>
          )}

          {channel.owner && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Created by: {channel.owner.fullname ?? channel.owner}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChannelDisplay;