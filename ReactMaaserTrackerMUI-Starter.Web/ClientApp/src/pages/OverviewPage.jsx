import React, {useEffect, useState} from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const OverviewPage = () => {
  const [totals, setTotals] = useState({
    totalIncome: '',
    totalMaaser: ''
  })

  useEffect(() => {
    const getTotals = async () => {
      const {data} = await axios.get('/api/maasertracker/getoverview')
      setTotals(data) 
    }
    getTotals()
  }, [])

  const maaserObligated = totals.totalIncome * .10
  const remainingMaaserObligation = maaserObligated - totals.totalMaaser

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Total Income:{totals.totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Total Maaser:{totals.totalMaaser.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Maaser Obligated: {maaserObligated.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Remaining Maaser obligation:{remainingMaaserObligation < 0 ? '$0.00' : remainingMaaserObligation.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
