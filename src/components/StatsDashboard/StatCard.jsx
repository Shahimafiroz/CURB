import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSanctions } from "../../context/SanctionsContext";
import { getScreeningHistory } from "../../utils/LocalStorageService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "14px",
  boxShadow: "0 4px 24px rgba(186, 24, 36, 0.08)",
}));

const useCountUp = (target, duration = 1200) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

function StatCard({ label, value, icon, color, bg, border }) {
  const animated = useCountUp(value);

  return (
    <Box
      sx={{
        flex: "1 1 200px",
        bgcolor: bg,
        border: `1.5px solid ${border}`,
        borderRadius: "14px",
        p: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 8px 24px ${border}44`,
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "12px",
          bgcolor: `${color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Box sx={{ fontSize: "1.8rem", fontWeight: 800, color, lineHeight: 1 }}>
          {animated.toLocaleString()}
        </Box>
        <Box
          sx={{ fontSize: "0.78rem", color: "#888", fontWeight: 600, mt: 0.3 }}
        >
          {label}
        </Box>
      </Box>
    </Box>
  );
}

export default StatCard;
