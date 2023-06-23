import React, {useState} from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddMaaserPage =() => {
    const navigate = useNavigate()
    const [maaser, setMaaser] = useState({
        recipient: '',
        amount: '',
        date: new Date()
    }) 

    const onMaaserChange = e => {
        const copy = {...maaser}
        copy[e.target.name] = e.target.value 
        setMaaser(copy)
    }

    const onAddMaasur = async () => {
        await axios.post('/api/maasertracker/addmaaser', maaser)
        navigate('/maaser')
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" name='recipient' onChange={onMaaserChange} />
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" name='amount'  onChange={onMaaserChange}/>
            <TextField
                label="Date"
                type="date"
                value={dayjs(maaser.date).format('YYYY-MM-DD')}
                name='date'
                onChange={onMaaserChange}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddMaasur}>Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
