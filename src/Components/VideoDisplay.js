import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Stack,
  TextField,
  Divider
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { SUBSCRIPTION_API_END_POINT, 
  VIDEO_API_END_POINT,
  VIDEO_COMMENT_API_END_POINT,
  VIDEOLIKE_API_END_POINT,
  COMMENT_API_END_POINT 
} from "../config/constants";

function VideoDisplay() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liking, setLiking] = useState(false);


  const [error, setError] = useState(null);
  const [subscribing, setSubscribing] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${VIDEO_API_END_POINT}/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load video");
        }

        const data = await res.json();
        console.log(data);
        setVideo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();


    const fetchComments = async () => {
      try {
        setCommentsLoading(true);
        const res = await fetch(`${VIDEO_COMMENT_API_END_POINT}/${id}`);
        const data = await res.json();
        setComments(data.results ?? data);
      } catch (err) {
        console.error("Failed to load comments", err);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();

    const fetchLikes = async () => {
      try {
        const countRes = await fetch(
          `${VIDEOLIKE_API_END_POINT}/count/${id}`
        );

        const countData = await countRes.json();

        setLikeCount(countData.count ?? 0);

        if (token) {
          const checkRes = await fetch(
            `${VIDEOLIKE_API_END_POINT}/check/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const checkData = await checkRes.json();
          setLiked(checkData.liked === true);
        }
      } catch (err) {
        console.error("Failed to load likes", err);
      }
    };

    fetchLikes();  
  }, [id, token]);

  const handleSubscribe = async () => {
    try {
      setSubscribing(true);

      await fetch(`${SUBSCRIPTION_API_END_POINT}/${video.channelId._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Subscribed to channel:", video.channelId);
      alert("Subscribed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe");
    } finally {
      setSubscribing(false);
    }
  }; 

  const handleLikeToggle = async () => {
    if (!token) {
      alert("Sign in to like videos");
      return;
    }

    try {
      setLiking(true);

      const res = await fetch(
        `${VIDEOLIKE_API_END_POINT}/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error("Failed to toggle like");
      }

      const data = await res.json();

      setLiked(data.liked);
      setLikeCount(prev =>
        data.liked ? prev + 1 : prev - 1
      );
    } catch (err) {
      console.error(err);
      alert("Failed to like video");
    } finally {
      setLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      setPostingComment(true);

      const res = await fetch(COMMENT_API_END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          video_id: id,
          details: commentText
        })
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      setCommentText("");

      // Refresh comments
      const updated = await fetch(`${VIDEO_COMMENT_API_END_POINT}/${id}`);
      const data = await updated.json();
      setComments(data.results ?? data);
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    } finally {
      setPostingComment(false);
    }
  };

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

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant={liked ? "contained" : "outlined"}
              color="secondary"
              onClick={handleLikeToggle}
              disabled={liking}
            >
              {liked ? "Liked" : "Like"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ alignSelf: "center" }}
            >
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </Typography>
          </Stack>

          {video.channelId && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Card
              component={RouterLink}
              to={`/channel/${video.channelId._id}`}
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
                Channel: {video.channelId.name || video.channelId._id}
              </Card>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubscribe}
                disabled={subscribing}
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </Stack>            
          )}
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>

        {/* Add Comment */}
        {token ? (
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={postingComment}
            >
              Post
            </Button>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sign in to add a comment
          </Typography>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Comment List */}
        {commentsLoading ? (
          <CircularProgress size={24} />
        ) : comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No comments yet
          </Typography>
        ) : (
          <Stack spacing={2}>
            {comments.map((comment) => (
              <Box key={comment._id}>
                <Typography variant="subtitle2">
                  {comment.creator?.username || "User"}
                </Typography>
                <Typography variant="body2">
                  {comment.details}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default VideoDisplay;

