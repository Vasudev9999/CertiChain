import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress
} from "@mui/material";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CertificateIllustration from '../components/CertificateIllustration';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const IssueCertificate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [issueSuccess, setIssueSuccess] = useState(false);
  const [completionDate, setCompletionDate] = useState(null);
  const [certificateType, setCertificateType] = useState('');
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleIssueCertificate = () => {
    setIsLoading(true);
    // Simulate blockchain interaction
    setTimeout(() => {
      setIsLoading(false);
      setIssueSuccess(true);
    }, 2000);
  };
  
  const steps = ['Recipient Details', 'Certificate Info', 'Review & Issue'];
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ my: 3 }}>
            <TextField 
              fullWidth 
              label="Recipient Name" 
              variant="outlined"
              placeholder="Enter the full name of the recipient"
              sx={{ mb: 3 }}
            />
            <TextField 
              fullWidth 
              label="Email Address" 
              variant="outlined"
              type="email"
              placeholder="Enter recipient's email address"
              sx={{ mb: 3 }}
            />
            <TextField 
              fullWidth 
              label="Blockchain Address (optional)" 
              variant="outlined"
              placeholder="0x..."
              helperText="If provided, the certificate will be linked to this address"
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ my: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="certificate-type-label">Certificate Type</InputLabel>
              <Select
                labelId="certificate-type-label"
                value={certificateType}
                label="Certificate Type"
                onChange={(e) => setCertificateType(e.target.value)}
              >
                <MenuItem value="course_completion">Course Completion</MenuItem>
                <MenuItem value="academic_degree">Academic Degree</MenuItem>
                <MenuItem value="professional_certification">Professional Certification</MenuItem>
                <MenuItem value="achievement_award">Achievement Award</MenuItem>
              </Select>
            </FormControl>
            
            <TextField 
              fullWidth 
              label="Certificate Title" 
              variant="outlined"
              placeholder="e.g., Blockchain Developer Certification"
              sx={{ mb: 3 }}
            />
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Completion Date"
                value={completionDate}
                onChange={(newDate) => setCompletionDate(newDate)}
                renderInput={(params) => 
                  <TextField {...params} fullWidth sx={{ mb: 3 }} />
                }
                sx={{ width: '100%', mb: 3 }}
              />
            </LocalizationProvider>
            
            <Button
              component="label"
              variant="outlined"
              startIcon={<FileUploadIcon />}
              sx={{ width: '100%' }}
            >
              Upload Certificate Logo/Image
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Certificate Preview</Typography>
            
            <Paper elevation={1} sx={{ p: 3, mb: 3, border: '1px dashed #1976d2' }}>
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                <CertificateIllustration />
              </Box>
            </Paper>
            
            <Divider sx={{ my: 3 }}>
              <Chip label="Blockchain Details" />
            </Divider>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Network</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>Hedera Hashgraph</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Estimated Gas Fee</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>0.001 HBAR</Typography>
              </Grid>
            </Grid>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              By clicking "Issue Certificate", you are creating an immutable record on the blockchain. This action cannot be undone.
            </Alert>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  if (issueSuccess) {
    return (
      <Box sx={{ 
        minHeight: 'calc(100vh - 170px)', 
        pt: { xs: '80px', sm: '90px' }, 
        pb: 8,
        backgroundColor: theme => theme.palette.mode === 'dark' ? '#121212' : '#f9fafb',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{ 
              padding: 5, 
              textAlign: 'center',
              border: '1px solid #4caf50',
              borderRadius: 2
            }}
          >
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 70, mb: 2 }} />
            <Typography variant="h4" gutterBottom>Certificate Issued Successfully!</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The certificate has been permanently recorded on the Hedera blockchain and is now verifiable.
            </Typography>
            
            <Box sx={{ my: 4, p: 2, backgroundColor: 'rgba(76, 175, 80, 0.08)', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                Transaction ID: 0x3f7e8a1d2b9c4e5f6a7b8c9d0e1f2a3b4c5d6e7f
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button 
                  fullWidth
                  variant="contained" 
                  color="primary"
                  component="a"
                  href="/certificates"
                >
                  View All Certificates
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  fullWidth
                  variant="outlined" 
                  onClick={() => {
                    setActiveStep(0);
                    setIssueSuccess(false);
                  }}
                >
                  Issue Another Certificate
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 170px)', 
      pt: { xs: '80px', sm: '90px' }, 
      pb: 8,
      backgroundColor: theme => theme.palette.mode === 'dark' ? '#121212' : '#f9fafb'
    }}>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                padding: 4,
                height: '100%',
                borderRadius: 2
              }}
            >
              <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 700 }}>
                Issue a Certificate
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Create a blockchain-verified certificate that cannot be tampered with.
              </Typography>
              
              <Box sx={{ width: '100%', mt: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                
                {getStepContent(activeStep)}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleIssueCertificate}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                        sx={{ 
                          backgroundColor: '#4caf50',
                          '&:hover': { backgroundColor: '#388e3c' }
                        }}
                      >
                        {isLoading ? 'Processing...' : 'Issue Certificate'}
                      </Button>
                    ) : (
                      <Button 
                        variant="contained" 
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(25, 118, 210, 0.05)',
                  mb: 3
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InfoOutlinedIcon color="primary" />
                  Quick Tips
                </Typography>
                <Typography variant="body2" paragraph>
                  • Each certificate is uniquely identified on the blockchain
                </Typography>
                <Typography variant="body2" paragraph>
                  • Recipients can verify their credentials using the Verify page
                </Typography>
                <Typography variant="body2" paragraph>
                  • Consider adding social media links where recipients can share their achievements
                </Typography>
                <Typography variant="body2">
                  • You can revoke certificates later if needed
                </Typography>
              </Paper>
              
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: '#4caf50',
                  color: 'white'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Benefits of Blockchain Certificates
                </Typography>
                <Typography variant="body2" paragraph>
                  • Tamper-proof and permanent verification
                </Typography>
                <Typography variant="body2" paragraph>
                  • No reliance on centralized authorities
                </Typography>
                <Typography variant="body2">
                  • Global recognition without geographical limitations
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default IssueCertificate;