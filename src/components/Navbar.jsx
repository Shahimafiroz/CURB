/* eslint-disable */
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Outlet, useNavigate, useLocation } from "react-router";

const pages = [
  { title: "Home", link: "/" },
  { title: "Screen Name", link: "/screenName" },
  { title: "Sanctions List", link: "/sanctionsList" },
  { title: "Screening History", link: "/screeningHistory" },
  { title: "Stats Dashboard", link: "/stats" },
  { title: "Batch Screen", link: "/batchScreen" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleNavigate = (link) => {
    navigate(link);
    handleCloseNavMenu();
  };

  const isActive = (link) =>
    link === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link);

  return (
    <div>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          // Dark glass base
          background: "rgba(22, 27, 40, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.35)",

          // Smooth entry animation
          "@keyframes slideDown": {
            from: { transform: "translateY(-100%)", opacity: 0 },
            to: { transform: "translateY(0)", opacity: 1 },
          },
          animation: "slideDown 0.4s ease forwards",
        }}
      >
        {/* Thin red accent line at very top */}
        <Box
          sx={{
            height: "3px",
            background:
              "linear-gradient(90deg, #ba1824 0%, #fc5153 50%, #ba1824 50%)",
            backgroundSize: "200% 100%",
            "@keyframes shimmer": {
              "0%": { backgroundPosition: "200% 0" },
              "100%": { backgroundPosition: "-200% 0" },
            },
            animation: "shimmer 4s linear infinite",
          }}
        />

        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: "68px", md: "76px" }, gap: 2 }}
          >
            {/* ── Custom SVG Logo ── */}
            <Box
              onClick={() => navigate("/")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                cursor: "pointer",
                flexShrink: 0,
                mr: { xs: 1, md: 3 },
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              {/* STREAMS text with italic style */}
              <svg
                width="160"
                height="32"
                viewBox="0 0 160 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="22"
                  fontFamily="'Poppins', 'Helvetica', sans-serif"
                  fontSize="24"
                  fontWeight="700"
                  fontStyle="italic"
                  letterSpacing="2.5"
                  fill="url(#logoGradient)"
                >
                  CURB
                </text>
                <defs>
                  <linearGradient
                    id="logoGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#fc5153" />
                    <stop offset="100%" stopColor="#ba1824" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Tagline */}
              <Box
                component="span"
                sx={{
                  fontSize: "0.68rem",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.8px",
                  fontWeight: 400,
                  mt: "-3px",
                  ml: "2px",
                }}
              >
                Stop blocked transfers before they happen
              </Box>
            </Box>

            {/* ── Desktop nav links ── */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {pages.map((page, index) => {
                const active = isActive(page.link);
                return (
                  <Button
                    key={index}
                    onClick={() => handleNavigate(page.link)}
                    disableRipple
                    sx={{
                      position: "relative",
                      px: 1.8,
                      py: 1,
                      color: active ? "#fff" : "rgba(255,255,255,0.62)",
                      fontWeight: active ? 600 : 400,
                      fontSize: "0.88rem",
                      letterSpacing: "0.3px",
                      textTransform: "none",
                      borderRadius: "8px",
                      bgcolor: active ? "rgba(186,24,36,0.18)" : "transparent",
                      transition: "all 0.2s ease",

                      // Animated underline
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "6px",
                        left: "50%",
                        transform: active
                          ? "translateX(-50%) scaleX(1)"
                          : "translateX(-50%) scaleX(0)",
                        transformOrigin: "center",
                        width: "60%",
                        height: "2px",
                        borderRadius: "2px",
                        background: "linear-gradient(90deg, #ba1824, #fc5153)",
                        transition: "transform 0.25s ease",
                      },

                      "&:hover": {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.07)",
                        "&::after": {
                          transform: "translateX(-50%) scaleX(1)",
                        },
                      },
                    }}
                  >
                    {page.title}
                  </Button>
                );
              })}
            </Box>

            {/* ── Mobile hamburger ── */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": {
                    color: "#fc5153",
                    bgcolor: "rgba(186,24,36,0.12)",
                  },
                  transition: "all 0.2s",
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Mobile dropdown menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 220,
                    background: "rgba(22, 27, 40, 0.97)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    overflow: "hidden",
                  },
                }}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {/* Red top strip on mobile menu */}
                <Box
                  sx={{
                    height: "3px",
                    background: "linear-gradient(90deg, #ba1824, #fc5153)",
                    mb: 0.5,
                  }}
                />
                {pages.map((page, index) => {
                  const active = isActive(page.link);
                  return (
                    <React.Fragment key={index}>
                      <MenuItem
                        onClick={() => handleNavigate(page.link)}
                        sx={{
                          py: 1.2,
                          px: 2.5,
                          color: active ? "#fff" : "rgba(255,255,255,0.7)",
                          fontWeight: active ? 600 : 400,
                          fontSize: "0.9rem",
                          bgcolor: active
                            ? "rgba(186,24,36,0.2)"
                            : "transparent",
                          borderLeft: active
                            ? "3px solid #fc5153"
                            : "3px solid transparent",
                          transition: "all 0.15s ease",
                          "&:hover": {
                            color: "#fff",
                            bgcolor: "rgba(255,255,255,0.07)",
                          },
                        }}
                      >
                        {page.title}
                      </MenuItem>
                      {index < pages.length - 1 && (
                        <Divider
                          sx={{ borderColor: "rgba(255,255,255,0.05)", my: 0 }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </div>
  );
}

export default Navbar;
