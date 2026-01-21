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

import { ARTICLE_API_END_POINT } from '../config/constants.js';

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");

        console.log("Fetching articles with token:", token);

        const res = await fetch(`${ARTICLE_API_END_POINT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch My Articles results');
        }

        const data = await res.json();
        console.log(data);
        setArticles(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Articles
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

      {!loading && !error && articles.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No articles found.
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <Card sx={{ height: '100%' }}>
              {article.imageURL && (
                <CardMedia
                  component="img"
                  image={article.imageURL}   // ✅ image
                  alt={article.title}             // ✅ alt text
                  preload="metadata"
                  sx={{ height: 160 }}
                />
              )}

              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {article.title}
                </Typography>

                {article.details && (
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
                    {article.details}
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

export default MyArticles;