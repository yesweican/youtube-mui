import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { CHANNEL_API_END_POINT } from "../config/constants";

function ChannelEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    owner: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  /* ---------- Load video + channels ---------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const channelRes = await fetch(`${CHANNEL_API_END_POINT}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!channelRes.ok) throw new Error("Failed to load channel");

        console.log(channelRes);

        const channel = await channelRes.json();

        setForm({
          name: channel.name || "",
          description: channel.description || "",
          owner: channel.owner?._id || channel.owner || ""
        });
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

      const res = await fetch(`${CHANNEL_API_END_POINT}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to update video");
      }

      navigate(`/channel/${id}`);
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
        label="Name"
        name="name"
        value={form.name}
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

      <Typography
            variant="body2"
            color="text.secondary"
      >
        Owner: {form.owner || form.owner.name}
      </Typography>

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

export default ChannelEdit;