import React, { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const IncomePage = () => {
  const [groupBySource, setGroupBySource] = useState(false);
  const [incomes, setIncomes] = useState([])

  useEffect(() => {
    const getIncomes = async () => {
      const { data } = await axios.get('/api/maasertracker/getincomes')
      setIncomes(data)
    }
    getIncomes()
  }, [])

  const flatList = list => {
    const flatIncomes = list.flatMap((source) => {
      return source.incomes.map((income) => {
        return {
          source: source.name,
          amount: income.amount,
          date: income.date
        }
      })
    })

    const sorted = flatIncomes.sort((a, b) => new Date(a.date) - new Date(b.date));
    return sorted
  }

  const flattenedList = flatList(incomes);
  
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />
      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flattenedList && flattenedList.map((income) => (
                <TableRow key={income.id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {income.source}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{income.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.date).format('MMMM D, YYYY')}</TableCell>
                </TableRow>)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        incomes.map(({ name, incomes, id }) => (
          <div key={id} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {name}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.map((income) =>
                  (
                    <TableRow key={income.id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{income.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.date).format('MMMM D, YYYY')}</TableCell>
                    </TableRow>
                  )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      )}
    </Container>
  );
}

export default IncomePage;
