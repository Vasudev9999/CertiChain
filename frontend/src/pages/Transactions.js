import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Transactions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [copiedHash, setCopiedHash] = useState("");

  // Simulate loading transactions from API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransactions([
        {
          id: "tx-a1b2c3d4",
          type: "issue",
          status: "confirmed",
          timestamp: "2025-03-05T14:23:15",
          hash: "0x3a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
          gas: 0.0023,
          certificate: {
            id: "cert-a1b2c3d4",
            title: "Blockchain Developer Certification"
          }
        },
        {
          id: "tx-e5f6g7h8",
          type: "issue",
          status: "confirmed",
          timestamp: "2025-03-01T09:45:30",
          hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
          gas: 0.0018,
          certificate: {
            id: "cert-e5f6g7h8",
            title: "Smart Contract Security Specialist"
          }
        },
        {
          id: "tx-i9j0k1l2",
          type: "issue",
          status: "confirmed",
          timestamp: "2025-02-15T16:12:45",
          hash: "0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0",
          gas: 0.0021,
          certificate: {
            id: "cert-i9j0k1l2",
            title: "Decentralized Finance Fundamentals"
          }
        },
        {
          id: "tx-m3n4o5p6",
          type: "verify",
          status: "confirmed",
          timestamp: "2025-03-06T10:05:22",
          hash: "0xd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
          gas: 0.0008,
          certificate: {
            id: "cert-e5f6g7h8",
            title: "Smart Contract Security Specialist"
          }
        },
        {
          id: "tx-q7r8s9t0",
          type: "verify",
          status: "pending",
          timestamp: "2025-03-06T08:30:17",
          hash: "0xf9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
          gas: 0.0009,
          certificate: {
            id: "cert-a1b2c3d4",
            title: "Blockchain Developer Certification"
          }
        },
        {
          id: "tx-u1v2w3x4",
          type: "revoke",
          status: "confirmed",
          timestamp: "2025-02-28T13:40:12",
          hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
          gas: 0.0015,
          certificate: {
            id: "cert-u1v2w3x4",
            title: "Introduction to Cryptocurrency"
          }
        },
        {
          id: "tx-y5z6a7b8",
          type: "issue",
          status: "failed",
          timestamp: "2025-03-04T11:25:36",
          hash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
          gas: 0.0007,
          error: "Gas limit exceeded",
          certificate: {
            id: "cert-y5z6a7b8",
            title: "Advanced Blockchain Architecture"
          }
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filterType) => {
    setFilter(filterType);
    handleFilterClose();
  };

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(""), 2000);
    });
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Chip
            icon={<CheckCircleIcon fontSize="small" />}
            label="Confirmed"
            size="small"
            color="success"
          />
        );
      case "pending":
        return (
          <Chip
            icon={<DataSaverOnIcon fontSize="small" />}
            label="Pending"
            size="small"
            color="warning"
          />
        );
      case "failed":
        return (
          <Chip
            icon={<ReportProblemIcon fontSize="small" />}
            label="Failed"
            size="small"
            color="error"
          />
        );
      default:
        return (
          <Chip label={status} size="small" variant="outlined" />
        );
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "issue":
        return <TrendingUpIcon sx={{ color: theme.palette.primary.main }} />;
      case "verify":
        return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
      case "revoke":
        return <TrendingDownIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return <ReceiptIcon sx={{ color: theme.palette.text.secondary }} />;
    }
  };

  // Apply filters
  const filteredTransactions = transactions
    .filter((tx) => {
      if (filter === "all") return true;
      return tx.type === filter;
    })
    .filter((tx) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(query) ||
        tx.hash.toLowerCase().includes(query) ||
        tx.certificate.title.toLowerCase().includes(query)
      );
    });
  
  // Calculate stats
  const stats = {
    total: transactions.length,
    issued: transactions.filter(tx => tx.type === 'issue').length,
    verified: transactions.filter(tx => tx.type === 'verify').length,
    pending: transactions.filter(tx => tx.status === 'pending').length
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format hash
  const formatHash = (hash) => {
    if (isMobile) {
      return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
    }
    return `${hash.substring(0, 14)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 170px)', 
      pt: { xs: '80px', sm: '90px' }, 
      pb: 8,
      backgroundColor: theme => theme.palette.mode === 'dark' ? '#121212' : '#f9fafb'
    }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 4
          }}
        >
          Blockchain Transactions
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Card elevation={2}>
              <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.total}</Typography>
                <Typography variant="body2" color="text.secondary">Total Transactions</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card elevation={2}>
              <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.primary.main }}>{stats.issued}</Typography>
                <Typography variant="body2" color="text.secondary">Certificates Issued</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card elevation={2}>
              <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.success.main }}>{stats.verified}</Typography>
                <Typography variant="body2" color="text.secondary">Certificates Verified</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card elevation={2}>
              <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.warning.main }}>{stats.pending}</Typography>
                <Typography variant="body2" color="text.secondary">Pending</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ mb: 4, p: 2, borderRadius: 2 }} elevation={1}>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1
          }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Transaction History
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search transactions..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: { xs: 140, sm: 200 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={() => handleFilterSelect('all')}>All Transactions</MenuItem>
                <MenuItem onClick={() => handleFilterSelect('issue')}>Issue</MenuItem>
                <MenuItem onClick={() => handleFilterSelect('verify')}>Verify</MenuItem>
                <MenuItem onClick={() => handleFilterSelect('revoke')}>Revoke</MenuItem>
              </Menu>
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ mt: 3 }}>
              {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                  <Box sx={{ width: '100%' }}>
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="80%" height={20} />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <>
              <TableContainer sx={{ mt: 2 }}>
                <Table aria-label="transaction table" size={isMobile ? "small" : "medium"}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell>Certificate</TableCell>
                      <TableCell>Hash</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Status</TableCell>
                      {!isMobile && <TableCell align="right">Gas</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((tx) => (
                        <TableRow
                          key={tx.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getTypeIcon(tx.type)}
                              <Typography 
                                sx={{ ml: 1, textTransform: 'capitalize', display: { xs: 'none', sm: 'block' } }}
                              >
                                {tx.type}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="View transaction details">
                              <Button
                                size="small"
                                sx={{ 
                                  textTransform: 'none', 
                                  fontFamily: 'monospace',
                                  fontSize: isMobile ? '0.7rem' : '0.8rem'
                                }}
                                endIcon={<OpenInNewIcon fontSize="small" />}
                              >
                                {isMobile ? tx.id.substring(0, 6) + '...' : tx.id}
                              </Button>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" noWrap sx={{ maxWidth: { xs: 100, sm: 200 } }}>
                              {tx.certificate.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                variant="body2"
                                sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                              >
                                {formatHash(tx.hash)}
                              </Typography>
                              <Tooltip title={copiedHash === tx.hash ? "Copied!" : "Copy hash"}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleCopyHash(tx.hash)}
                                  color={copiedHash === tx.hash ? "primary" : "default"}
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" noWrap>
                              {formatDate(tx.timestamp)}
                            </Typography>
                          </TableCell>
                          <TableCell>{getStatusChip(tx.status)}</TableCell>
                          {!isMobile && (
                            <TableCell align="right">
                              <Typography 
                                variant="body2" 
                                sx={{ fontFamily: 'monospace', fontWeight: 500 }}
                              >
                                {tx.gas.toFixed(4)} HBAR
                              </Typography>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                      
                    {filteredTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                          <Typography variant="body1" color="text.secondary">
                            No transactions found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Try adjusting your search or filter
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredTransactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Transactions;