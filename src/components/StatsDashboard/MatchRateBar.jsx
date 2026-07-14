import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSanctions } from "../../context/SanctionsContext";
import { getScreeningHistory } from "../../utils/LocalStorageService";
import StatCard from "./StatCard";

function MatchRateBar({ rate }) {
  return (
    <Box sx={{ mt: 1 }}>
      <Box
        sx={{
          height: 8,
          borderRadius: "4px",
          bgcolor: "#f0f0f0",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${rate}%`,
            background: "linear-gradient(90deg, #ba1824, #fc5153)",
            borderRadius: "4px",
            transition: "width 1s ease",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
        <span style={{ fontSize: "0.72rem", color: "#888" }}>0%</span>
        <span
          style={{ fontSize: "0.72rem", color: "#ba1824", fontWeight: 700 }}
        >
          {rate.toFixed(1)}% match rate
        </span>
        <span style={{ fontSize: "0.72rem", color: "#888" }}>100%</span>
      </Box>
    </Box>
  );
}

export default MatchRateBar;
