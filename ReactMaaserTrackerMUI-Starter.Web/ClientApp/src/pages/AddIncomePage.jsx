import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddIncomePage = () => {
    const navigate = useNavigate()
 
    const [sources, setSources] = useState([])

    const [income, setIncome] = useState({
        sourceId: '',
        amount: '',
        date: new Date()
    })

    const getSources = async () => {
        const { data } = await axios.get('/api/maasertracker/getsources')
        setSources(data)
      }
    
      useEffect(() => {
        getSources()
      }, [])

      const onIncomeChange = (e) => {
        const copy = {...income}
        copy[e.target.name] = e.target.value 
        setIncome({...copy})
    }

    const onSourceChange = (e, value) => {
        setIncome({...income, sourceId: value.id})
    }

    const onAddIncome = async () => {
        await axios.post('/api/maasertracker/addincome', income)
        navigate('/income')
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                inputValue={income.source}
                name='source'
                onChange={onSourceChange}
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                name='amount'
                value={income.amount}
                onChange={onIncomeChange}
            />
             <TextField
                label="Date"
                type="date"
                name='date'
                value={dayjs(income.date).format('YYYY-MM-DD')}
                onChange={onIncomeChange}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddIncome}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
