import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSanctions } from "../../context/SanctionsContext";
import { getScreeningHistory } from "../../utils/LocalStorageService";
import StatCard from "./StatCard";
import MatchRateBar from "./MatchRateBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "14px",
  boxShadow: "0 4px 24px rgba(186, 24, 36, 0.08)",
}));

function MainDashboard() {
  const { sanctionObjArr, loading } = useSanctions();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getScreeningHistory());
  }, []);

  // Computing stats from history
  const totalSessions = history.length;
  const totalQueries = history.reduce(
    (acc, s) => acc + s.stats.totalQueries,
    0,
  );
  const totalMatches = history.reduce(
    (acc, s) => acc + s.stats.totalMatches,
    0,
  );
  const totalClear = totalQueries - totalMatches;
  const matchRate = totalQueries > 0 ? (totalMatches / totalQueries) * 100 : 0;

  // Recent 5 entries across all sessions
  const recentEntries = history
    .flatMap((s) =>
      s.entries.map((e) => ({ ...e, sessionTime: s.displayTime })),
    )
    .slice(0, 8);

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
              Dashboard
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
                📊 Sanctions Screening Overview
              </span>
            </Box>
          </Box>
        </Box>

        {/* Live indicator */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#01bf65",
              boxShadow: "0 0 0 3px #01bf6533",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 #01bf6555" },
                "70%": { boxShadow: "0 0 0 8px #01bf6500" },
                "100%": { boxShadow: "0 0 0 0 #01bf6500" },
              },
            }}
          />
          <span
            style={{ fontSize: "0.78rem", color: "#018c4a", fontWeight: 600 }}
          >
            Live
          </span>
        </Box>
      </Box>

      {/* ── Stat Cards Row ── */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <StatCard
          label="Sanctions Loaded"
          value={loading ? 0 : sanctionObjArr.length}
          icon="📋"
          color="#ba1824"
          bg="#fff8f8"
          border="#fde0e0"
        />
        <StatCard
          label="Screening Sessions"
          value={totalSessions}
          icon="🔍"
          color="#1a1a2e"
          bg="#f8f8ff"
          border="#e0e0f0"
        />
        <StatCard
          label="Total Queries"
          value={totalQueries}
          icon="📝"
          color="#7c3aed"
          bg="#faf5ff"
          border="#e9d5ff"
        />
        <StatCard
          label="Matches Found"
          value={totalMatches}
          icon="⚠️"
          color="#ba1824"
          bg="#fff0f0"
          border="#fde0e0"
        />
        <StatCard
          label="Clear Results"
          value={totalClear}
          icon="✅"
          color="#018c4a"
          bg="#f0fff8"
          border="#d0f5e8"
        />
      </Box>

      {/* ── Match Rate + Recent Activity Row ── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Match Rate Card */}
        <Item sx={{ flex: "1", textAlign: "left" }}>
          <Box
            sx={{
              mx: -2,
              mt: -2,
              mb: 2,
              px: 2,
              py: 1.5,
              background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
              borderRadius: "14px 14px 0 0",
            }}
          >
            <span
              style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}
            >
              📈 Match Rate Overview
            </span>
          </Box>

          <Box sx={{ px: 1 }}>
            {/* Big rate number */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 1,
                mb: 2,
              }}
            >
              <span
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 800,
                  color: "#ba1824",
                  lineHeight: 1,
                }}
              >
                {matchRate.toFixed(1)}
              </span>
              <span style={{ fontSize: "1.5rem", color: "#ba1824", mb: "6px" }}>
                %
              </span>
              <span style={{ fontSize: "0.85rem", color: "#888", mb: "8px" }}>
                overall match rate
              </span>
            </Box>
            <MatchRateBar rate={matchRate} />

            {/* Breakdown */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 3,
                pt: 2,
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Box
                  sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#ba1824" }}
                >
                  {totalMatches}
                </Box>
                <Box
                  sx={{ fontSize: "0.72rem", color: "#888", fontWeight: 600 }}
                >
                  🔴 Sanctioned
                </Box>
              </Box>
              <Box
                sx={{ width: "1px", bgcolor: "#f0f0f0", alignSelf: "stretch" }}
              />
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Box
                  sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#018c4a" }}
                >
                  {totalClear}
                </Box>
                <Box
                  sx={{ fontSize: "0.72rem", color: "#888", fontWeight: 600 }}
                >
                  ✅ Clear
                </Box>
              </Box>
              <Box
                sx={{ width: "1px", bgcolor: "#f0f0f0", alignSelf: "stretch" }}
              />
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Box
                  sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#1a1a2e" }}
                >
                  {totalSessions}
                </Box>
                <Box
                  sx={{ fontSize: "0.72rem", color: "#888", fontWeight: 600 }}
                >
                  🔍 Sessions
                </Box>
              </Box>
            </Box>
          </Box>
        </Item>

        {/* Sanctions List Info Card */}
        <Item sx={{ flex: "0 0 280px", textAlign: "left" }}>
          <Box
            sx={{
              mx: -2,
              mt: -2,
              mb: 2,
              px: 2,
              py: 1.5,
              background: "linear-gradient(90deg, #ba1824 0%, #fc5153 100%)",
              borderRadius: "14px 14px 0 0",
            }}
          >
            <span
              style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}
            >
              🛡️ Sanctions List Status
            </span>
          </Box>

          <Box sx={{ px: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
                p: 1.5,
                bgcolor: loading ? "#fffbe6" : "#f0fff8",
                border: `1px solid ${loading ? "#fde68a" : "#01bf65"}`,
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: loading ? "#f59e0b" : "#01bf65",
                  flexShrink: 0,
                  boxShadow: loading
                    ? "0 0 0 3px #fde68a55"
                    : "0 0 0 3px #01bf6533",
                }}
              />
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: loading ? "#92400e" : "#018c4a",
                }}
              >
                {loading ? "Loading sanctions..." : "Sanctions list active"}
              </span>
            </Box>

            <Box
              sx={{
                p: 2,
                bgcolor: "#fff8f8",
                border: "1px solid #fde0e0",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Box
                sx={{ fontSize: "2.5rem", fontWeight: 800, color: "#ba1824" }}
              >
                {loading ? "—" : sanctionObjArr.length.toLocaleString()}
              </Box>
              <Box sx={{ fontSize: "0.78rem", color: "#888", fontWeight: 600 }}>
                total sanctioned entries
              </Box>
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 1.5,
                bgcolor: "#f8f8ff",
                border: "1px solid #e0e0f0",
                borderRadius: "10px",
                fontSize: "0.78rem",
                color: "#888",
                lineHeight: 1.6,
              }}
            >
              ℹ️ Sanctions data is fetched live from the API on each session.
              Use the refresh button on the screening page to reload.
            </Box>
          </Box>
        </Item>
      </Box>

      {/* ── Recent Activity Table ── */}
      <Item sx={{ textAlign: "left" }}>
        <Box
          sx={{
            mx: -2,
            mt: -2,
            mb: 2,
            px: 2,
            py: 1.5,
            background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
            borderRadius: "14px 14px 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
            🕓 Recent Activity
          </span>
          <span style={{ fontSize: "0.75rem", color: "#a0b4ff" }}>
            Last {recentEntries.length} queries
          </span>
        </Box>

        {recentEntries.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
              gap: 1,
              color: "#aaa",
            }}
          >
            <span style={{ fontSize: "2rem" }}>📭</span>
            <span style={{ fontSize: "0.9rem" }}>
              No screening activity yet. Run your first search!
            </span>
          </Box>
        ) : (
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
                  {["#", "Query Name", "Status", "Matched Name", "Time"].map(
                    (col) => (
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
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {recentEntries.map((entry, idx) => (
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
                      (e.currentTarget.style.backgroundColor = entry.matchFound
                        ? "#fde8e8"
                        : "#c8f5e4")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = entry.matchFound
                        ? idx % 2 === 0
                          ? "#fff8f8"
                          : "#ffffff"
                        : idx % 2 === 0
                          ? "#f0fff8"
                          : "#f7fffc")
                    }
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        color: "#bbb",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      {idx + 1}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: "#2d2d2d",
                        fontWeight: 500,
                      }}
                    >
                      {entry.queriedName}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 12px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: entry.matchFound ? "#fff0f0" : "#f0fff8",
                          color: entry.matchFound ? "#ba1824" : "#018c4a",
                          border: `1px solid ${entry.matchFound ? "#fc5153" : "#01bf65"}`,
                        }}
                      >
                        {entry.matchFound ? "🔴 Sanctioned" : "✅ Clear"}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: entry.matchFound ? "#ba1824" : "#aaa",
                        fontWeight: entry.matchFound ? 600 : 400,
                        fontStyle: entry.matchFound ? "normal" : "italic",
                      }}
                    >
                      {entry.matchedName ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: "#aaa",
                        fontSize: "0.78rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </Item>
    </Box>
  );
}

export default MainDashboard;
