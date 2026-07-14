import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CommonRedButton from "../../utils/CommonComponents/CommonRedButton";
import allGood from "../../assets/ag.png";
import warning from "../../assets/w.png";
import { useSanctions } from "../../context/SanctionsContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LoadingComponent from "../../utils/CommonComponents/LoadingComponent";
import { searchSanctions } from "../../utils/Utils";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "90%",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  borderRadius: "14px",
  boxShadow: "0 4px 24px rgba(186, 24, 36, 0.08)",
}));

function ScreenName() {
  const { sanctionObjArr, loading, error } = useSanctions();

  const [enteredName, setEnteredName] = useState("");
  const [validBtn, setValidBtn] = useState(false);
  const [matchFound, setMatchFound] = useState("initial");
  const [resultantSearchArray, setresultantSearchArray] = useState([]);

  if (loading) return <LoadingComponent />;
  if (error) return <p>{error}</p>;

  const handleInputFormValidation = (input) => {
    // Only allow single line — block newlines
    const singleLine = input.replace(/\n/g, "");
    setEnteredName(singleLine);
    singleLine.length > 2 && singleLine.length < 255
      ? setValidBtn(true)
      : setValidBtn(false);
  };

  const screeningTheName = async () => {
    // console.log("name from state", enteredName);

    // Send as single-item array — max 1 query
    const queryArr = [enteredName.toLowerCase().trim()];

    const result = await searchSanctions(sanctionObjArr, queryArr);
    // console.log("result", result);

    setresultantSearchArray(result.resultantArray);

    if (result.stats.noneMatched) {
      setMatchFound(false);
    } else {
      setMatchFound(true);
    }
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
          gap: 2,
          mb: 1,
          pb: 2,
          borderBottom: "2px solid #fde0e0",
        }}
      >
        {/* Red accent bar */}
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
            Screen Name
          </h1>
          {/* Sanctions count badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              mt: 0.5,
              bgcolor: "#fff0f0",
              border: "1px solid #f5c0c0",
              borderRadius: "20px",
              px: 1.5,
              py: 0.3,
            }}
          >
            <span
              style={{ fontSize: "0.78rem", color: "#ba1824", fontWeight: 600 }}
            >
              📋 {sanctionObjArr.length} sanctions loaded
            </span>
          </Box>
        </Box>
      </Box>

      {/* ── Two-column layout ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mt: 2,
        }}
      >
        {/* ── LEFT PANEL — Input ── */}
        <Box sx={{ width: { xs: "100%", md: "33.33%" }, display: "flex" }}>
          <Item sx={{ width: "100%" }}>
            {/* Coloured top strip */}
            <Box
              sx={{
                mx: -2,
                mt: -2,
                mb: 2,
                px: 2,
                py: 1.5,
                background: "linear-gradient(90deg, #ba1824 0%, #fc5153 100%)",
                borderRadius: "14px 14px 0 0",
                textAlign: "left",
              }}
            >
              <span
                style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}
              >
                🔍 Enter Details
              </span>
            </Box>

            <Box
              sx={{
                padding: "1rem",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <TextField
                error={enteredName.length > 0 && !validBtn}
                fullWidth
                label="Enter name to screen"
                value={enteredName}
                onChange={(e) => handleInputFormValidation(e.target.value)}
                helperText="Name must be between 3 and 255 characters."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "&.Mui-focused fieldset": { borderColor: "#ba1824" },
                    "&:hover fieldset": { borderColor: "#fc5153" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ba1824" },
                }}
              />

              <Box
                sx={{
                  bgcolor: "#fff5f5",
                  border: "1px solid #fdd",
                  borderRadius: "8px",
                  p: 1.5,
                }}
              >
                <p style={{ color: "#ba1824", margin: 0, fontSize: "0.85rem" }}>
                  ℹ️ Enter the full name you want to screen against the
                  sanctions list.
                </p>
              </Box>

              <CommonRedButton
                text={"Screen"}
                functionCall={screeningTheName}
                validBtn={validBtn}
              />
            </Box>
          </Item>
        </Box>

        {/* ── RIGHT PANEL — Results ── */}
        <Box
          sx={{
            width: { xs: "100%", md: "66.67%" },
            minHeight: { xs: "300px", md: "auto" },
          }}
        >
          <Item>
            {matchFound === "initial" ? (
              // ── Initial State ──
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "300px",
                  gap: 2,
                }}
              >
                <SearchInitialIcon />
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
                    🔍 Go ahead and search for sanctioned entities.
                  </span>
                </Box>
              </Box>
            ) : matchFound ? (
              // ── Match Found State ──
              <Box>
                {/* Warning header strip */}
                <Box
                  sx={{
                    mx: -2,
                    mt: -2,
                    mb: 2,
                    px: 2,
                    py: 1.5,
                    background:
                      "linear-gradient(90deg, #ba1824 0%, #fc5153 100%)",
                    borderRadius: "14px 14px 0 0",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    ⚠️ Screening Results
                  </span>
                </Box>

                {/* Warning icon + message */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fc5153",
                    fontSize: "20px",
                    pb: 1,
                  }}
                >
                  <img
                    src={warning}
                    alt="warning"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <Box
                    sx={{
                      mt: 1,
                      px: 3,
                      py: 1,
                      bgcolor: "#fff0f0",
                      border: "1px solid #fc5153",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#ba1824" }}>
                      ⚠️ Caution! Match Found In Sanctions.
                    </span>
                  </Box>
                </Box>

                {/* Matches list */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "100%", sm: 560 },
                      bgcolor: "background.paper",
                      border: "1px solid #fde0e0",
                      borderRadius: "10px",
                      overflow: "auto",
                      maxHeight: "350px",
                      "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                  >
                    <li>
                      <ul style={{ padding: 0 }}>
                        <ListSubheader
                          sx={{
                            background:
                              "linear-gradient(90deg, #ba1824, #fc5153)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            letterSpacing: "0.5px",
                            lineHeight: "40px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: 2,
                          }}
                        >
                          <span>🔴 Match Found</span>
                        </ListSubheader>

                        {resultantSearchArray.map((item, index) => (
                          <ListItem
                            key={`result-${index}`}
                            sx={{
                              bgcolor: item?.matchFound
                                ? index % 2 === 0
                                  ? "#fff8f8"
                                  : "#ffffff"
                                : index % 2 === 0
                                  ? "#f0fff8"
                                  : "#f7fffc",
                              borderBottom: "1px solid",
                              borderColor: item?.matchFound
                                ? "#fde8e8"
                                : "#d0f5e8",
                              "&:last-child": { borderBottom: "none" },
                              "&:hover": {
                                bgcolor: item?.matchFound
                                  ? "#fde8e8"
                                  : "#d0f5e8",
                                transition: "background-color 0.2s",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor: item?.matchFound
                                  ? "#fc5153"
                                  : "#01bf65",
                                mr: 1.5,
                                flexShrink: 0,
                              }}
                            />
                            <ListItemText
                              primary={
                                item?.matchFound
                                  ? (item?.originalName ?? "—")
                                  : (item?.lowerCaseName ?? "—")
                              }
                              secondary={
                                item?.matchFound ? "🔴 Sanctioned" : "✅ Clear"
                              }
                              sx={{
                                "& .MuiListItemText-primary": {
                                  color: "#2d2d2d",
                                  fontWeight: 500,
                                  fontSize: "0.9rem",
                                  textAlign: "left",
                                },
                                "& .MuiListItemText-secondary": {
                                  color: item?.matchFound
                                    ? "#ba1824"
                                    : "#018c4a",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                  textAlign: "left",
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </ul>
                    </li>
                  </List>
                </Box>
              </Box>
            ) : (
              // ── All Good state ──
              <Box>
                <Box
                  sx={{
                    mx: -2,
                    mt: -2,
                    mb: 2,
                    px: 2,
                    py: 1.5,
                    background:
                      "linear-gradient(90deg, #018c4a 0%, #01bf65 100%)",
                    borderRadius: "14px 14px 0 0",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    ✅ Screening Results
                  </span>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#01bf65",
                    fontSize: "20px",
                    width: "100%",
                    minHeight: "300px",
                  }}
                >
                  <img
                    src={allGood}
                    alt="All Good"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <Box
                    sx={{
                      mt: 2,
                      px: 3,
                      py: 1,
                      bgcolor: "#f0fff8",
                      border: "1px solid #01bf65",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#018c4a" }}>
                      ✅ Safe! No Sanctioned Accounts Found.
                    </span>
                  </Box>
                </Box>
              </Box>
            )}
          </Item>
        </Box>
      </Box>
    </Box>
  );
}

export default ScreenName;

const SearchInitialIcon = () => (
  <svg
    width="180"
    height="180"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="90"
      cy="90"
      r="85"
      fill="#f0f4ff"
      stroke="#a0b4ff"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <path
      d="M90 40 L130 58 L130 95 C130 118 110 133 90 142 C70 133 50 118 50 95 L50 58 Z"
      fill="url(#shieldGrad)"
      stroke="#1a1a2e"
      strokeWidth="2"
    />
    <path
      d="M90 48 L120 63 L120 95 C120 113 105 126 90 134"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <circle
      cx="85"
      cy="88"
      r="22"
      fill="#fff"
      stroke="#1a1a2e"
      strokeWidth="3"
    />
    <circle
      cx="85"
      cy="88"
      r="15"
      fill="#e8eeff"
      stroke="#a0b4ff"
      strokeWidth="1.5"
    />
    <line
      x1="101"
      y1="104"
      x2="118"
      y2="121"
      stroke="#1a1a2e"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="78"
      y1="84"
      x2="92"
      y2="84"
      stroke="#a0b4ff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="78"
      y1="90"
      x2="88"
      y2="90"
      stroke="#a0b4ff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="shieldGrad"
        x1="90"
        y1="40"
        x2="90"
        y2="142"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#16213e" />
      </linearGradient>
    </defs>
  </svg>
);
