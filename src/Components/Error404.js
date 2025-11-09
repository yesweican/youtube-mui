import React from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import image404 from "../images/UnderConst.png"; // adjust path accordingly

export default function Error404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
        textAlign: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <CardMedia
          component="img"
          image={image404}
          alt="Page not found"
          sx={{
            height: "auto",
          }}
        />
      </Card>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for doesn’t exist or has been moved.
      </Typography>
    </Box>
  );
}