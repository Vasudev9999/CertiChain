import React from 'react';
import { Box } from '@mui/material';

const CertificateIllustration = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.2))'
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 500 350" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Certificate Background */}
        <rect width="500" height="350" fill="#ffffff" rx="8" />
        
        {/* Border */}
        <rect x="10" y="10" width="480" height="330" rx="6" fill="none" stroke="#1565c0" strokeWidth="3" strokeDasharray="2" />
        
        {/* Header */}
        <rect x="40" y="30" width="420" height="70" rx="4" fill="#e3f2fd" />
        <text x="250" y="65" fontFamily="Arial" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#1565c0">CERTIFICATE</text>
        <text x="250" y="90" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#1565c0">OF ACHIEVEMENT</text>
        
        {/* Main Content */}
        <text x="250" y="140" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#555555">This certifies that</text>
        <line x1="100" y1="160" x2="400" y2="160" stroke="#bbdefb" strokeWidth="1" />
        <text x="250" y="175" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#333333">RECIPIENT NAME</text>
        
        <text x="250" y="210" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#555555">has successfully completed</text>
        <line x1="100" y1="230" x2="400" y2="230" stroke="#bbdefb" strokeWidth="1" />
        <text x="250" y="245" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#333333">BLOCKCHAIN CERTIFICATION</text>
        
        {/* Footer */}
        <line x1="130" y1="290" x2="230" y2="290" stroke="#1976d2" strokeWidth="1" />
        <text x="180" y="305" fontFamily="Arial" fontSize="10" textAnchor="middle" fill="#555555">SIGNATURE</text>
        
        <line x1="270" y1="290" x2="370" y2="290" stroke="#1976d2" strokeWidth="1" />
        <text x="320" y="305" fontFamily="Arial" fontSize="10" textAnchor="middle" fill="#555555">DATE</text>
        
        {/* Blockchain Badge */}
        <circle cx="420" cy="290" r="30" fill="#4caf50" fillOpacity="0.8" />
        <text x="420" y="295" fontFamily="Arial" fontSize="20" fontWeight="bold" textAnchor="middle" fill="white">BC</text>
      </svg>
    </Box>
  );
};

export default CertificateIllustration;