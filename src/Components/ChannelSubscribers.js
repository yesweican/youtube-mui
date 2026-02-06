import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
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

import { CHANNEL_SUBSCRIBERS_API_END_POINT } from '../config/constants.js';

function ChannelSubscribers() {
  const { id } = useParams();

  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchSubscribers = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");

        console.log("Fetching subscribers with token:", token);

        const res = await fetch(`${CHANNEL_SUBSCRIBERS_API_END_POINT}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch my subscribers');
        }

        const data = await res.json();
        console.log(data);
        setSubscribers(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [id]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Channel Subscribers
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

      {!loading && !error && subscribers.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No subscribers found.
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {subscribers.map((subscriber) => (
        <Grid item xs={12} key={subscriber._id}>
          <Card
            component={RouterLink}
            to={`/channelsubscriber/${subscriber._id}`}
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
                {subscriber.fullname}
              </Typography>

              {subscriber.email && (
                <Typography variant="body2" color="text.secondary">
                  {subscriber.email}
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

export default ChannelSubscribers;