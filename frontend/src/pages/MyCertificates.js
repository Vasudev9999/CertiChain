import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Skeleton,
  Avatar,
  useTheme,
  Tooltip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CertificateIllustration from "../components/CertificateIllustration";

const MyCertificates = () => {
  const theme = useTheme();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [certificateMenuAnchor, setCertificateMenuAnchor] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Simulate loading data from API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCertificates([
        {
          id: "cert-a1b2c3d4",
          title: "Blockchain Developer Certification",
          type: "professional",
          issueDate: "2025-01-15",
          expiryDate: "2028-01-15",
          issuer: "Blockchain Academy",
          verified: true,
          featured: true,
          skills: ["Solidity", "Smart Contracts", "DApps"],
          transactionId: "0x3a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b"
        },
        {
          id: "cert-e5f6g7h8",
          title: "Smart Contract Security Specialist",
          type: "professional",
          issueDate: "2025-02-22",
          expiryDate: "2027-02-22",
          issuer: "Secure Blockchain Institute",
          verified: true,
          featured: false,
          skills: ["Security Audits", "Vulnerability Testing"],
          transactionId: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b"
        },
        {
          id: "cert-i9j0k1l2",
          title: "Decentralized Finance Fundamentals",
          type: "course",
          issueDate: "2024-11-30",
          expiryDate: null,
          issuer: "DeFi Learning Hub",
          verified: true,
          featured: false,
          skills: ["Yield Farming", "Liquidity Pools", "DeFi Protocols"],
          transactionId: "0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0"
        },
        {
          id: "cert-m3n4o5p6",
          title: "Bachelor of Science in Computer Science",
          type: "academic",
          issueDate: "2024-06-15",
          expiryDate: null,
          issuer: "Tech University",
          verified: true,
          featured: true,
          skills: ["Computer Science", "Software Development", "Algorithms"],
          transactionId: "0xd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4"
        },
        {
          id: "cert-q7r8s9t0",
          title: "Hackathon First Prize Winner",
          type: "achievement",
          issueDate: "2024-10-05",
          expiryDate: null,
          issuer: "Global Blockchain Hackathon",
          verified: true,
          featured: false,
          skills: ["Innovation", "Web3", "Problem Solving"],
          transactionId: "0xf9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8"
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCertificateMenuOpen = (event, certificate) => {
    setCertificateMenuAnchor(event.currentTarget);
    setSelectedCertificate(certificate);
  };

  const handleCertificateMenuClose = () => {
    setCertificateMenuAnchor(null);
    setSelectedCertificate(null);
  };

  const getCertificateTypeIcon = (type) => {
    switch (type) {
      case "professional":
        return <WorkIcon sx={{ color: "#2196f3" }} />;
      case "academic":
        return <SchoolIcon sx={{ color: "#9c27b0" }} />;
      case "achievement":
        return <MilitaryTechIcon sx={{ color: "#ff9800" }} />;
      case "course":
      default:
        return <SchoolIcon sx={{ color: "#4caf50" }} />;
    }
  };

  const filteredCertificates = certificates
    .filter((cert) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          cert.title.toLowerCase().includes(query) ||
          cert.issuer.toLowerCase().includes(query) ||
          cert.id.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter((cert) => {
      // Tab filter
      if (selectedTab === 0) return true; // All
      if (selectedTab === 1) return cert.featured; // Featured
      if (selectedTab === 2) return cert.type === "professional"; // Professional
      if (selectedTab === 3) return cert.type === "academic"; // Academic
      if (selectedTab === 4) return cert.type === "course" || cert.type === "achievement"; // Other
      return true;
    });

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 170px)",
        pt: { xs: "80px", sm: "90px" },
        pb: 8,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#121212" : "#f9fafb"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                mb: 4
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 700, mb: { xs: 2, md: 0 } }}
              >
                My Certificates
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: { xs: "100%", md: "auto" }
                }}
              >
                <TextField
                  placeholder="Search certificates..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: { xs: "100%", md: 250 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={handleFilterClick}
                >
                  Filter
                </Button>
                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterClose}
                >
                  <MenuItem onClick={handleFilterClose}>Most Recent</MenuItem>
                  <MenuItem onClick={handleFilterClose}>Oldest First</MenuItem>
                  <MenuItem onClick={handleFilterClose}>By Issuer</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{ borderRadius: 2, backgroundColor: "background.paper" }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                >
                  <Tab label="All Certificates" />
                  <Tab label="Featured" />
                  <Tab label="Professional" />
                  <Tab label="Academic" />
                  <Tab label="Other" />
                </Tabs>
              </Box>

              <Box sx={{ p: 3 }}>
                {loading ? (
                  <Grid container spacing={3}>
                    {[1, 2, 3].map((item) => (
                      <Grid item xs={12} md={6} lg={4} key={item}>
                        <Card elevation={2}>
                          <CardContent>
                            <Skeleton
                              animation="wave"
                              height={30}
                              width="80%"
                              style={{ marginBottom: 10 }}
                            />
                            <Skeleton
                              animation="wave"
                              height={20}
                              width="60%"
                              style={{ marginBottom: 10 }}
                            />
                            <Skeleton
                              animation="wave"
                              height={20}
                              width="40%"
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : filteredCertificates.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 8,
                      px: 2,
                      backgroundColor: "rgba(0,0,0,0.02)",
                      borderRadius: 1
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      No certificates found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search or filter criteria
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {filteredCertificates.map((certificate) => (
                      <Grid item xs={12} md={6} lg={4} key={certificate.id}>
                        <Card
                          elevation={2}
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: "0 12px 20px -10px rgba(0,0,0,0.2)"
                            }
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              backgroundColor:
                                certificate.type === "professional"
                                  ? "rgba(33, 150, 243, 0.08)"
                                  : certificate.type === "academic"
                                  ? "rgba(156, 39, 176, 0.08)"
                                  : certificate.type === "achievement"
                                  ? "rgba(255, 152, 0, 0.08)"
                                  : "rgba(76, 175, 80, 0.08)",
                              p: 2,
                              display: "flex",
                              justifyContent: "center",
                              borderBottom:
                                "1px solid " + theme.palette.divider
                            }}
                          >
                            <Box sx={{ width: "70%" }}>
                              <CertificateIllustration />
                            </Box>
                            {certificate.featured && (
                              <Chip
                                label="Featured"
                                color="primary"
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10
                                }}
                              />
                            )}
                          </Box>

                          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor:
                                    certificate.type === "professional"
                                      ? "primary.main"
                                      : certificate.type === "academic"
                                      ? "secondary.main"
                                      : certificate.type === "achievement"
                                      ? "warning.main"
                                      : "success.main",
                                  width: 24,
                                  height: 24
                                }}
                              >
                                {getCertificateTypeIcon(certificate.type)}
                              </Avatar>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {certificate.type}
                              </Typography>
                              {certificate.verified && (
                                <Tooltip title="Verified on Blockchain">
                                  <VerifiedIcon
                                    color="primary"
                                    sx={{ fontSize: 18, ml: "auto" }}
                                  />
                                </Tooltip>
                              )}
                            </Box>

                            <Typography
                              variant="h6"
                              component="h2"
                              sx={{ fontWeight: 600, mb: 1 }}
                            >
                              {certificate.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              Issued by {certificate.issuer} on{" "}
                              {new Date(
                                certificate.issueDate
                              ).toLocaleDateString()}
                            </Typography>

                            <Box sx={{ mt: 1 }}>
                              {certificate.skills.slice(0, 3).map((skill) => (
                                <Chip
                                  key={skill}
                                  label={skill}
                                  size="small"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                              {certificate.skills.length > 3 && (
                                <Chip
                                  label={`+${certificate.skills.length - 3}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ mb: 0.5 }}
                                />
                              )}
                            </Box>
                          </CardContent>

                          <Divider />
                          <CardActions
                            sx={{ justifyContent: "space-between", px: 2 }}
                          >
                            <Button
                              size="small"
                              startIcon={<GetAppIcon />}
                              color="primary"
                            >
                              Download
                            </Button>
                            <Box>
                              <IconButton
                                size="small"
                                color="primary"
                                aria-label="share"
                              >
                                <ShareIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                aria-label="more options"
                                onClick={(e) =>
                                  handleCertificateMenuOpen(e, certificate)
                                }
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Menu
        anchorEl={certificateMenuAnchor}
        open={Boolean(certificateMenuAnchor)}
        onClose={handleCertificateMenuClose}
      >
        <MenuItem onClick={handleCertificateMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleCertificateMenuClose}>Share Certificate</MenuItem>
        <MenuItem onClick={handleCertificateMenuClose}>Verify on Blockchain</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleCertificateMenuClose}
          sx={{ color: "error.main" }}
        >
          Report Issue
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MyCertificates;