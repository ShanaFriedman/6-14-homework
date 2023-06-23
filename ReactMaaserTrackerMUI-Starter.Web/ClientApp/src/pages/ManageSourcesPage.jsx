import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ManageSourcesPage = () => {
  const [sources, setSources] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState('');
  const [isEditing, setIsEditing] = useState(false)

  const getSources = async () => {
    const { data } = await axios.get('/api/maasertracker/getsources')
    setSources(data)
  }

  useEffect(() => {
    getSources()
  }, [])

  const handleOpen = (source = '') => {
    setOpen(true);
    setSelectedSource(source);
    setIsEditing(source !== '')
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSource('');
    setIsEditing(false)
  };

  const handleAddEdit = async () => {
    if (isEditing) {
      await axios.post('/api/maasertracker/editsource', {name: selectedSource.name, id: selectedSource.id})
      getSources()
    } else {
      await axios.post('/api/maasertracker/addsource', {name: selectedSource.name})
      getSources()
    }
    handleClose();
  };

  const handleDelete = async (sourceToDelete) => {
    await axios.post('/api/maasertracker/deletesource', {name: sourceToDelete.name, id: sourceToDelete.id})
      getSources()
  };

  const onTextBoxChange = e => {
    setSelectedSource({...selectedSource, name: e.target.value})
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
          Add Source
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                  <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} disabled={source.incomes.length} onClick={() => handleDelete(source)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{isEditing ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource.name} onChange={onTextBoxChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {isEditing ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageSourcesPage;
