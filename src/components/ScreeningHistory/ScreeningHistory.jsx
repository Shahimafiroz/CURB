import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getScreeningHistory,
  clearScreeningHistory,
} from "../../utils/LocalStorageService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "14px",
  boxShadow: "0 4px 24px rgba(186, 24, 36, 0.08)",
}));

function ScreeningHistory() {
  const [history, setHistory] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    setHistory(getScreeningHistory());
  }, []);

  const handleClear = () => {
    clearScreeningHistory();
    setHistory([]);
  };

  return (
    <Box
      sx={{
        width: "90%",
        minHeight: "90vh",
        p: 2,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        background: "linear-gradient(135deg, #fafbff 0%, #fff5f5 100%)",
      }}
    >
      {/* ── Page Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          pb: 2,
          borderBottom: "2px solid #fde0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 6,
              height: 44,
              borderRadius: "4px",
              background: "linear-gradient(180deg, #ba1824 0%, #fc5153 100%)",
              flexShrink: 0,
            }}
          />
          <Box>
            <h1
              style={{
                margin: 0,
                color: "#1a1a2e",
                fontSize: "1.8rem",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Screening History
            </h1>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                mt: 0.5,
                bgcolor: "#fff0f0",
                border: "1px solid #f5c0c0",
                borderRadius: "20px",
                px: 1.5,
                py: 0.3,
              }}
            >
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#ba1824",
                  fontWeight: 600,
                }}
              >
                🕓 {history.reduce((acc, s) => acc + s.entries.length, 0)} total
                queries screened
              </span>
            </Box>
          </Box>
        </Box>

        {/* Clear History Button */}
        <IconButton
          onClick={handleClear}
          disabled={history.length === 0}
          sx={{
            bgcolor: "#fff0f0",
            border: "1px solid #f5c0c0",
            color: "#ba1824",
            width: 44,
            height: 44,
            transition: "all 0.2s",
            "&:hover": { bgcolor: "#ba1824", color: "#fff" },
            "&.Mui-disabled": { opacity: 0.4 },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* ── Content ── */}
      {history.length === 0 ? (
        // Empty state
        <Item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              gap: 2,
            }}
          >
            <EmptyHistoryIcon />
            <Box
              sx={{
                px: 3,
                py: 1,
                bgcolor: "#f0f4ff",
                border: "1px solid #a0b4ff",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#1a1a2e" }}>
                📋 No screening history yet. Run a search to see results here.
              </span>
            </Box>
          </Box>
        </Item>
      ) : (
        // Sessions
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {history.map((session) => (
            <Item key={session.id}>
              {/* Session header */}
              <Box
                sx={{
                  mx: -2,
                  mt: -2,
                  mb: 2,
                  px: 2,
                  py: 1.5,
                  background:
                    "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
                  borderRadius: "14px 14px 0 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  🕓 {session.displayTime}
                </span>
                {/* Session stats badges */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <span
                    style={{
                      background: "#fc5153",
                      color: "#fff",
                      borderRadius: "12px",
                      padding: "2px 10px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    🔴 {session.stats.totalMatches} matched
                  </span>
                  <span
                    style={{
                      background: "#01bf65",
                      color: "#fff",
                      borderRadius: "12px",
                      padding: "2px 10px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    ✅ {session.stats.totalNotMatched} clear
                  </span>
                </Box>
              </Box>

              {/* Table */}
              <Box sx={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.875rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "linear-gradient(90deg, #f8f8ff, #fff5f5)",
                        borderBottom: "2px solid #fde0e0",
                      }}
                    >
                      {[
                        "#",
                        "Query Name",
                        "Match Status",
                        "Matched Name",
                        "Time",
                      ].map((col) => (
                        <th
                          key={col}
                          style={{
                            padding: "10px 14px",
                            textAlign: "left",
                            color: "#1a1a2e",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            letterSpacing: "0.4px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {session.entries.map((entry, idx) => (
                      <tr
                        key={idx}
                        style={{
                          backgroundColor: entry.matchFound
                            ? idx % 2 === 0
                              ? "#fff8f8"
                              : "#ffffff"
                            : idx % 2 === 0
                              ? "#f0fff8"
                              : "#f7fffc",
                          borderBottom: `1px solid ${entry.matchFound ? "#fde8e8" : "#d0f5e8"}`,
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            entry.matchFound ? "#fde8e8" : "#c8f5e4")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            entry.matchFound
                              ? idx % 2 === 0
                                ? "#fff8f8"
                                : "#ffffff"
                              : idx % 2 === 0
                                ? "#f0fff8"
                                : "#f7fffc")
                        }
                      >
                        {/* # */}
                        <td
                          style={{
                            padding: "10px 14px",
                            color: "#888",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                          }}
                        >
                          {idx + 1}
                        </td>

                        {/* Query Name */}
                        <td
                          style={{
                            padding: "10px 14px",
                            color: "#2d2d2d",
                            fontWeight: 500,
                            textAlign: "left",
                          }}
                        >
                          {entry.queriedName}
                        </td>

                        {/* Match Status Badge */}
                        <td style={{ padding: "10px 14px", textAlign: "left" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 12px",
                              borderRadius: "12px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              background: entry.matchFound
                                ? "#fff0f0"
                                : "#f0fff8",
                              color: entry.matchFound ? "#ba1824" : "#018c4a",
                              border: `1px solid ${entry.matchFound ? "#fc5153" : "#01bf65"}`,
                            }}
                          >
                            {entry.matchFound ? "🔴 Sanctioned" : "✅ Clear"}
                          </span>
                        </td>

                        {/* Matched Name */}
                        <td
                          style={{
                            padding: "10px 14px",
                            color: entry.matchFound ? "#ba1824" : "#888",
                            fontWeight: entry.matchFound ? 600 : 400,
                            fontStyle: entry.matchFound ? "normal" : "italic",
                            textAlign: "left",
                          }}
                        >
                          {entry.matchedName ?? "—"}
                        </td>

                        {/* Time */}
                        <td
                          style={{
                            padding: "10px 14px",
                            color: "#888",
                            fontSize: "0.8rem",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          {entry.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Item>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ScreeningHistory;

const EmptyHistoryIcon = () => (
  <svg
    width="140"
    height="140"
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="70"
      cy="70"
      r="65"
      fill="#f0f4ff"
      stroke="#a0b4ff"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <rect x="35" y="45" width="70" height="55" rx="6" fill="#1a1a2e" />
    <rect
      x="41"
      y="55"
      width="58"
      height="6"
      rx="3"
      fill="#a0b4ff"
      opacity="0.5"
    />
    <rect
      x="41"
      y="66"
      width="40"
      height="6"
      rx="3"
      fill="#a0b4ff"
      opacity="0.35"
    />
    <rect
      x="41"
      y="77"
      width="50"
      height="6"
      rx="3"
      fill="#a0b4ff"
      opacity="0.35"
    />
    <circle
      cx="95"
      cy="95"
      r="18"
      fill="#fff"
      stroke="#a0b4ff"
      strokeWidth="2"
    />
    <line
      x1="95"
      y1="87"
      x2="95"
      y2="97"
      stroke="#1a1a2e"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="95" cy="101" r="1.5" fill="#1a1a2e" />
  </svg>
);
