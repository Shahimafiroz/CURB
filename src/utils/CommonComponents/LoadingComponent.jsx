import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingComponent({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fafbff 0%, #fff5f5 100%)",
      }}
    >
      {/* Animated container */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Outer rotating ring */}
        <Box
          sx={{
            position: "relative",
            width: "120px",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Background glow */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(186,24,36,0.15) 0%, transparent 70%)",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  opacity: 0.5,
                },
                "50%": {
                  transform: "scale(1.1)",
                  opacity: 0.8,
                },
              },
            }}
          />

          {/* Main spinner */}
          <CircularProgress
            size={80}
            thickness={3}
            sx={{
              color: "#ba1824",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          {/* Inner gradient ring */}
          <Box
            sx={{
              position: "absolute",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTopColor: "#fc5153",
              borderRightColor: "#fc5153",
              animation: "spin 1.5s linear infinite reverse",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />

          {/* Center dot */}
          <Box
            sx={{
              position: "absolute",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ba1824 0%, #fc5153 100%)",
              animation: "scalePulse 1s ease-in-out infinite",
              "@keyframes scalePulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                },
                "50%": {
                  transform: "scale(1.3)",
                },
              },
            }}
          />
        </Box>

        {/* Loading text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#1a1a2e",
              letterSpacing: "0.5px",
            }}
          >
            {message}
          </Box>

          {/* Animated dots */}
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  bgcolor: "#ba1824",
                  animation: "bounce 1.4s ease-in-out infinite",
                  animationDelay: `${index * 0.16}s`,
                  "@keyframes bounce": {
                    "0%, 80%, 100%": {
                      transform: "scale(0.8)",
                      opacity: 0.5,
                    },
                    "40%": {
                      transform: "scale(1.2)",
                      opacity: 1,
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoadingComponent;
