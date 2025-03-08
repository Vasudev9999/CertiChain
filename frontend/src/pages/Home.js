import React from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia,
  CardActionArea,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import CertificateIllustration from '../components/CertificateIllustration';


const Home = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <SecurityOutlinedIcon sx={{ fontSize: 50, color: "#4caf50" }} />,
      title: "Tamper-Proof",
      description: "Certificates are secured by blockchain technology, making them impossible to forge or alter."
    },
    {
      icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 50, color: "#2196f3" }} />,
      title: "Instantly Verifiable",
      description: "Anyone can verify the authenticity of your certificates in seconds."
    },
    {
      icon: <SpeedOutlinedIcon sx={{ fontSize: 50, color: "#ff9800" }} />,
      title: "Fast & Efficient",
      description: "Issue and manage digital certificates with speed and ease."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      pt: { xs: '80px', sm: '90px' }, 
      pb: 8,
      backgroundColor: theme => theme.palette.mode === 'dark' ? '#121212' : '#f9fafb'
    }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Blockchain-Powered 
                  <Box component="span" sx={{ color: '#4caf50' }}> Certificate</Box> Platform
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}>
                  Securely issue, store, and verify certificates on the Hedera blockchain.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    component={Link} 
                    to="/issue"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ 
                      backgroundColor: '#4caf50',
                      '&:hover': { backgroundColor: '#388e3c' }
                    }}
                  >
                    Issue Certificate
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    component={Link} 
                    to="/verify"
                    sx={{ 
                      color: 'white', 
                      borderColor: 'white',
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Verify Certificate
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
  <CertificateIllustration />
</Grid>
          </Grid>
        </Container>
        {/* Abstract Shapes Background */}
        <Box 
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -50,
            width: 400,
            height: 400,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            zIndex: 0
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Why Choose CertiChain?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our platform provides a secure and efficient way to manage digital credentials
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px -10px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: 'rgba(25, 118, 210, 0.05)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
            How It Works
          </Typography>
          <Grid container spacing={isMediumScreen ? 4 : 0} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    backgroundColor: '#1976d2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  1
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Issue Certificate</Typography>
                <Typography variant="body1" color="text.secondary">
                  Create a new digital certificate with recipient information and custom attributes.
                </Typography>
              </Box>
            </Grid>
            {!isMediumScreen && (
              <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                <Box component="hr" sx={{ width: '80%', borderTop: '2px dashed #1976d2' }} />
              </Grid>
            )}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    backgroundColor: '#1976d2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  2
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Store on Blockchain</Typography>
                <Typography variant="body1" color="text.secondary">
                  The certificate is securely stored on Hedera's distributed ledger, making it tamper-proof.
                </Typography>
              </Box>
            </Grid>
            {!isMediumScreen && (
              <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                <Box component="hr" sx={{ width: '80%', borderTop: '2px dashed #1976d2' }} />
              </Grid>
            )}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    backgroundColor: '#1976d2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  3
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Verify Instantly</Typography>
                <Typography variant="body1" color="text.secondary">
                  Anyone can instantly verify the authenticity of certificates through our platform.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join hundreds of organizations that trust CertiChain for their digital credential needs
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          component={Link} 
          to="/issue"
          sx={{ 
            px: 4, 
            py: 1.5, 
            fontSize: '1.1rem' 
          }}
        >
          Start Issuing Certificates
        </Button>
      </Container>

    </Box>
  );
};

export default Home;