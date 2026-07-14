/* eslint-disable */
import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

function CommonRedButton({ text, functionCall, validBtn }) {
  return (
    <Button
      variant="contained"
      onClick={() => functionCall()}
      disabled={!validBtn}
      startIcon={<SearchIcon sx={{ fontSize: "1.1rem" }} />}
      sx={{
        // Base styles
        color: "#fff",
        background: "linear-gradient(135deg, #ba1824 0%, #fc5153 100%)",
        fontFamily: "'Poppins', sans-serif",
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.95rem",
        letterSpacing: "0.4px",
        padding: "0.65rem 2.5rem",
        borderRadius: "10px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(186, 24, 36, 0.35)",
        transition: "all 0.25s ease",

        // Shine sweep effect
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-75%",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
          transform: "skewX(-20deg)",
          transition: "left 0.5s ease",
        },

        "&:hover": {
          background: "linear-gradient(135deg, #96131d 0%, #e03e3f 100%)",
          boxShadow: "0 6px 22px rgba(186, 24, 36, 0.5)",
          transform: "translateY(-2px)",

          // Trigger shine sweep on hover
          "&::before": {
            left: "130%",
          },
        },

        "&:active": {
          transform: "translateY(0px)",
          boxShadow: "0 2px 8px rgba(186, 24, 36, 0.3)",
        },

        // Disabled state
        "&.Mui-disabled": {
          background: "#e0e0e0",
          color: "#aaa",
          boxShadow: "none",
          transform: "none",
          cursor: "not-allowed",
        },
      }}
    >
      {text}
    </Button>
  );
}

export default CommonRedButton;
