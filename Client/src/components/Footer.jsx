import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#282c34",
        color: "white",
        textAlign: "center",
        justifyContent: "center",
        padding: "5px 10px",
        position: "relative",
        bottom: 0,
        maxWidth: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        "The only way to do great work is to love what you do." — Steve Jobs
      </Typography>
    </Box>
  );
};

export default Footer;
