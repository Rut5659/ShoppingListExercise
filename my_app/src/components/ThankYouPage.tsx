import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" gutterBottom>
        תודה שקניתם אצלנו
      </Typography>
      <Typography variant="h5" gutterBottom>
      💐 ההזמנה התקבלה בהצלחה 💐
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        חזרה לעמוד הקניות
      </Button>
    </Box>
  );
}
