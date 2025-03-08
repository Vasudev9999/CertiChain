import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  InputAdornment,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Chip 
} from "@mui/material";
import CertificateIllustration from "../components/CertificateIllustration";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const Verify = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);
  const [certificateId, setCertificateId] = useState("");
  const [verificationState, setVerificationState] = useState("initial"); // initial, loading, verified, invalid
  const [verificationResult, setVerificationResult] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setVerificationState("initial");
  };

  const handleVerify = () => {
    if (!certificateId) return;
    
    setVerificationState("loading");
    
    // Simulate API verification call
    setTimeout(() => {
      // Demo: Verify if ID contains "valid" to simulate success
      if (certificateId.toLowerCase().includes("valid")) {
        setVerificationState("verified");
        setVerificationResult({
          id: certificateId,
          title: "Blockchain Developer Certification",
          recipient: "Alex Johnson",
          issuer: "Blockchain Academy",
          issueDate: "2025-01-15T10:30:00",
          expiryDate: "2028-01-15T10:30:00",
          blockchain: "Hedera Hashgraph",
          transactionId: "0x3a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
          skills: ["Solidity", "Smart Contracts", "DApps"]
        });
      } else {
        setVerificationState("invalid");
      }
    }, 2000);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderVerificationContent = () => {
    switch (verificationState) {
      case "loading":
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Verifying Certificate...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Checking the blockchain for certificate authenticity
            </Typography>
          </Box>
        );

      case "verified":
        return (
          <Box sx={{ mt: 4 }}>
            <Alert 
              severity="success" 
              icon={<CheckCircleOutlineIcon fontSize="large" />}
              sx={{ 
                mb: 4,
                alignItems: "center",
                "& .MuiAlert-message": { width: "100%" }
              }}
            >
              <AlertTitle sx={{ fontSize: "1.1rem" }}>Certificate Verified Successfully</AlertTitle>
              <Typography variant="body2" sx={{ mt: 1 }}>
                This certificate is authentic and has been verified on the blockchain.
              </Typography>
            </Alert>

            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3,
                    border: "1px solid #4caf50",
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <CertificateIllustration />
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    align="center"
                    sx={{ 
                      fontWeight: 600,
                      mt: 2
                    }}
                  >
                    {verificationResult.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    align="center"
                    sx={{ mt: 1 }}
                  >
                    Awarded to
                  </Typography>
                  <Typography 
                    variant="h6" 
                    align="center"
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.primary.main
                    }}
                  >
                    {verificationResult.recipient}
                  </Typography>

                  <Box 
                    sx={{
                      mt: "auto",
                      pt: 2,
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      flexWrap: "wrap"
                    }}
                  >
                    {verificationResult.skills.map((skill, index) => (
                      <Chip 
                        key={index} 
                        label={skill} 
                        size="small" 
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={7}>
                <Card elevation={1} sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Certificate Details
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Certificate ID
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {verificationResult.id}
                          </Typography>
                          <Tooltip title="Copy ID">
                            <IconButton size="small">
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Issuer
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {verificationResult.issuer}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Issue Date
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {formatDate(verificationResult.issueDate)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Expiry Date
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {verificationResult.expiryDate ? 
                            formatDate(verificationResult.expiryDate) : 
                            "Never expires"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                <Card elevation={1}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Blockchain Verification
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Blockchain
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {verificationResult.blockchain}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Transaction ID
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontFamily: "monospace", 
                              fontWeight: 500,
                              wordBreak: "break-all"
                            }}
                          >
                            {verificationResult.transactionId}
                          </Typography>
                          <Tooltip title="Copy Transaction ID">
                            <IconButton size="small">
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Button 
                      variant="outlined" 
                      size="small" 
                      endIcon={<SearchIcon />}
                      sx={{ mt: 2 }}
                    >
                      View on Explorer
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case "invalid":
        return (
          <Box sx={{ mt: 4 }}>
            <Alert 
              severity="error" 
              icon={<CancelOutlinedIcon fontSize="large" />}
              sx={{ mb: 4 }}
            >
              <AlertTitle sx={{ fontSize: "1.1rem" }}>Certificate Not Found</AlertTitle>
              <Typography variant="body2" sx={{ mt: 1 }}>
                We couldn't verify this certificate on the blockchain. Please check the ID and try again.
              </Typography>
            </Alert>
            
            <Box sx={{ textAlign: "center", py: 3 }}>
              <Button 
                variant="contained" 
                onClick={() => setVerificationState("initial")}
                sx={{ mt: 2 }}
              >
                Try Again
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 170px)', 
      pt: { xs: '80px', sm: '90px' }, 
      pb: 8,
      backgroundColor: theme => theme.palette.mode === 'dark' ? '#121212' : '#f9fafb'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Verify Certificates
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400, mb: 4 }}>
              Check the authenticity of any certificate issued on our blockchain platform.
            </Typography>
            
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                mb: { xs: 4, md: 0 }
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  aria-label="verification methods"
                  variant={isMobile ? "fullWidth" : "standard"}
                >
                  <Tab 
                    icon={<SearchIcon />} 
                    iconPosition="start" 
                    label="Certificate ID" 
                  />
                  <Tab 
                    icon={<QrCodeScannerIcon />} 
                    iconPosition="start" 
                    label="Scan QR" 
                  />
                  <Tab 
                    icon={<FileUploadIcon />} 
                    iconPosition="start" 
                    label="Upload" 
                  />
                </Tabs>
              </Box>

              {tabValue === 0 && (
                <Box>
                  <TextField
                    label="Enter Certificate ID"
                    variant="outlined"
                    fullWidth
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g., cert-a1b2c3d4"
                    helperText="Enter the unique certificate ID to verify its authenticity"
                    InputProps={{
                      endAdornment: (
                        <Tooltip title="Find the certificate ID on the bottom of your certificate">
                          <InputAdornment position="end">
                            <HelpOutlineIcon color="action" />
                          </InputAdornment>
                        </Tooltip>
                      )
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={!certificateId || verificationState === "loading"}
                    onClick={handleVerify}
                    startIcon={verificationState === "loading" ? 
                      <CircularProgress size={20} color="inherit" /> : 
                      <VerifiedUserIcon />
                    }
                    sx={{ 
                      py: 1.5,
                      backgroundColor: '#4caf50',
                      '&:hover': { backgroundColor: '#388e3c' }
                    }}
                  >
                    {verificationState === "loading" ? "Verifying..." : "Verify Certificate"}
                  </Button>
                </Box>
              )}

              {tabValue === 1 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <QrCodeScannerIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
                  <Typography variant="h6">Scan QR Code</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Point your device's camera at the certificate's QR code
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<QrCodeScannerIcon />}
                  >
                    Open Scanner
                  </Button>
                </Box>
              )}

              {tabValue === 2 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <FileUploadIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
                  <Typography variant="h6">Upload Certificate</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Upload a digital certificate file to verify its authenticity
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<FileUploadIcon />}
                  >
                    Select File
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
              )}

              {renderVerificationContent()}
            </Paper>
          </Grid>
          
          {!isMobile && verificationState === "initial" && (
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
              <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  height: "100%",
                  justifyContent: "center"
                }}
              >
                <Box sx={{ maxWidth: 450, mx: "auto" }}>
                  <CertificateIllustration />
                </Box>
                
                <Box sx={{ mt: 6 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    Why Verify?
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box>
                          <VerifiedUserIcon color="primary" sx={{ fontSize: 32 }} />
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                            Prevent Fraud
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ensure certificates are authentic and have not been altered.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box>
                          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 32 }} />
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                            Trust & Credibility
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Build confidence in the credentials presented by candidates.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Verify;