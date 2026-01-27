import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import { VIDEO_API_END_POINT, CHANNEL_API_END_POINT } from "../config/constants";

function VideoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    channelId: ""
  });

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  /* ---------- Load video + channels ---------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [videoRes, channelRes] = await Promise.all([
          fetch(`${VIDEO_API_END_POINT}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${CHANNEL_API_END_POINT}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (!videoRes.ok) throw new Error("Failed to load video");
        if (!channelRes.ok) throw new Error("Failed to load channels");

        console.log(videoRes);
        console.log(channelRes);

        const video = await videoRes.json();
        const channels = await channelRes.json();
        const channelList = channels.results;

        setForm({
          title: video.title || "",
          description: video.description || "",
          channelId:
            video.channelId?._id || video.channelId || ""
        });

        setChannels(channelList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, token]);

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${VIDEO_API_END_POINT}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to update video");
      }

      navigate(`/video/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  /* ---------- UI States ---------- */
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  /* ---------- Render ---------- */
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        Edit Video
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="channel-label">Channel</InputLabel>
        <Select
          labelId="channel-label"
          label="Channel"
          name="channelId"
          value={form.channelId}
          onChange={handleChange}
        >
          {channels.map((channel) => (
            <MenuItem key={channel._id} value={channel._id}>
              {channel.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
}

export default VideoEdit;



