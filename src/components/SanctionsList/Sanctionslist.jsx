import React, { useState, useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowUpward";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { useSanctions } from "../../context/SanctionsContext";
import LoadingComponent from "../../utils/CommonComponents/LoadingComponent";
import { filterAndSort } from "../../utils/Utils";
import Select from "@mui/material/Select";
import { use } from "react";
import MenuItem from "@mui/material/MenuItem";

function Sanctionslist() {
  /* ═════════════════════════════════════════════════════════════════ Code logic ═══════════════════════════════════════════════════════════════════════ */

  const { sanctionObjArr, loading, error, refresh } = useSanctions();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50); // State for this comp to avoid directly accessing the context state
  const [searchQuery, setSearchQuery] = useState(""); // State for text feild search
  const [debouncedSearchQuery, setdebouncedSearchQuery] = useState(""); //  State for delayed search
  const [sortOrder, setsortOrder] = useState("asc");

  // 1 .setting sanctions array
  useEffect(() => {
    setRows(sanctionObjArr);
  }, [sanctionObjArr]);

  ///////// 2. Mui call these functions for me along with passing the props
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  ////

  ///////////// 3. Debouncing the search query and setting in the debounced state

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  ///////////// 4 . Filtering and Sorting (Heavy Computation) ///////////////////
  /*
   since its a heavy computation service I have used useMemo
}
*/
  const filteredAndSortedRows = useMemo(() => {
    return filterAndSort(rows, debouncedSearchQuery, sortOrder);
  }, [rows, debouncedSearchQuery, sortOrder]);
  // console.log(
  //   "🚀 ~ Sanctionslist ~ filteredAndSortedRows:",
  //   filteredAndSortedRows,
  // );

  ///////////////// 5 . Pgination and sorting and display  /////////////
  const totalPages = Math.ceil(filteredAndSortedRows.length / rowsPerPage);
  const paginatedRows = filteredAndSortedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const toggleSort = () => {
    setsortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const startIdx =
    filteredAndSortedRows.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIdx = Math.min(page * rowsPerPage, filteredAndSortedRows.length);

  //////////////////// Refresh handler ///////////////
  const handleRefresh = () => {
    // console.log("Refresh clicked");
    setSearchQuery("");
    setdebouncedSearchQuery("");
    setsortOrder("asc");
    setPage(1);
    refresh();
  };

  ////////////// Inbuilt MUi handlers. /////
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (loading) return <LoadingComponent />;
  if (error) return <p>{error}</p>;

  /* ════════════════════════════════════════════════════════════════════ JSX - part  ═══════════════════════════════════════════════════════════════════════ */

  return (
    <Box
      sx={{
        width: "90%",
        mx: "auto",
        minHeight: "100vh",
        p: 2,
        pb: 3,
        background: "linear-gradient(135deg, #fafbff 0%, #fff5f5 100%)",
        boxSizing: "border-box",
      }}
    >
      {/* ══════════════════════════════════════════════ PAGE HEADER - Title, Badge, Refresh Button. ══════════════════════════════════════════════ */}
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
        {/* Left side - Title with accent bar and badge */}
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
              Sanctions List
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
                📋 {rows.length} total entries
              </span>
            </Box>
          </Box>
        </Box>

        {/* Right side - Refresh button */}
        <IconButton
          onClick={handleRefresh}
          sx={{
            bgcolor: "#fff0f0",
            border: "1px solid #f5c0c0",
            color: "#ba1824",
            width: 44,
            height: 44,
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "#ba1824",
              color: "#fff",
              transform: "rotate(90deg)",
            },
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* ════════════════════════════════════════════════ TABLE CARD ════════════════════════════════════════════════════ */}
      <Paper
        sx={{
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(186, 24, 36, 0.08)",
          width: "100%",
        }}
      >
        {/* ── Card header with search and sort controls ── */}
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            background: "linear-gradient(90deg, #ba1824 0%, #fc5153 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Left - Title */}
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
            🔴 Sanctioned Entities
          </span>

          {/* Right - Search and Sort controls */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* Search input */}
            <TextField
              size="small"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "1.1rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", sm: "240px" },
                bgcolor: "rgba(255,255,255,0.15)",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.6)",
                  opacity: 1,
                },
              }}
            />

            {/* Sort toggle button */}
            <IconButton
              onClick={toggleSort}
              sx={{
                color: "#fff",
                bgcolor: "rgba(255,255,255,0.15)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                transition: "all 0.2s",
              }}
            >
              {sortOrder === "asc" ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>

        {/* ✅ Current page info banner (Showing 1-50 of 200) */}
        <Box
          sx={{
            px: 2.5,
            py: 1,
            bgcolor: "#fdf0f0",
            borderBottom: "1px solid #fde0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "0.85rem", color: "#ba1824", fontWeight: 500 }}
          >
            Showing {startIdx}-{endIdx} of {filteredAndSortedRows.length}
          </span>
          <span style={{ fontSize: "0.8rem", color: "rgba(186,24,36,0.7)" }}>
            Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </span>
        </Box>

        {/* ── Table with sticky header ── */}
        <TableContainer
          sx={{
            maxHeight: "55vh",
            overflow: "auto",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "#fff5f5" },
            "&::-webkit-scrollbar-thumb": {
              background: "#f5c0c0",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": { background: "#fc5153" },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {/* Serial Number Column */}
                <TableCell
                  sx={{
                    width: "80px",
                    bgcolor: "#fdf0f0",
                    color: "#ba1824",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #f5c0c0",
                  }}
                >
                  S.No
                </TableCell>
                {/* ID Column */}
                <TableCell
                  sx={{
                    width: "100px",
                    bgcolor: "#fdf0f0",
                    color: "#ba1824",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #f5c0c0",
                  }}
                >
                  ID
                </TableCell>
                {/* Name Column */}
                <TableCell
                  sx={{
                    bgcolor: "#fdf0f0",
                    color: "#ba1824",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #f5c0c0",
                  }}
                >
                  Sanctioned Name
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <span style={{ color: "#ba1824", fontSize: "0.9rem" }}>
                      No results found for "{debouncedSearchQuery}"
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => {
                  // Calculate continuous serial number across pages
                  const serialNumber = (page - 1) * rowsPerPage + index + 1;

                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        bgcolor: index % 2 === 0 ? "#ffffff" : "#fff8f8",
                        "&:hover": {
                          bgcolor: "#fde8e8",
                          transition: "background-color 0.15s",
                        },
                        "&:last-child td": { borderBottom: "none" },
                      }}
                    >
                      {/* Serial Number - Continuous numbering */}
                      <TableCell
                        sx={{
                          color: "#666",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                          borderBottom: "1px solid #fde8e8",
                        }}
                      >
                        {serialNumber}
                      </TableCell>

                      {/* ID - Original ID from data */}
                      <TableCell
                        sx={{
                          color: "#ba1824",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          borderBottom: "1px solid #fde8e8",
                        }}
                      >
                        {row.id}
                      </TableCell>

                      {/* Name */}
                      <TableCell
                        sx={{
                          color: "#2d2d2d",
                          fontSize: "0.9rem",
                          borderBottom: "1px solid #fde8e8",
                        }}
                      >
                        {row.originalName}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ═════════════════════════════════════════════ PAGINATION FOOTER - Page controls + Rows per page ════════════════════════════════════════════ */}
        <Box
          sx={{
            borderTop: "2px solid #fde0e0",
            bgcolor: "#fdf0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Left side - Page navigation with First/Last buttons */}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            siblingCount={1}
            boundaryCount={1}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#ba1824",
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "rgba(186,24,36,0.1)",
                },
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                bgcolor: "#ba1824",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#96131d",
                },
              },
            }}
          />

          {/* Right side - Rows per page selector */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{
                fontSize: "0.85rem",
                color: "#ba1824",
                fontWeight: 500,
              }}
            >
              Rows per page:
            </span>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              size="small"
              sx={{
                color: "#ba1824",
                fontWeight: 600,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f5c0c0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ba1824",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ba1824",
                },
                "& .MuiSelect-icon": {
                  color: "#ba1824",
                },
              }}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Sanctionslist;
