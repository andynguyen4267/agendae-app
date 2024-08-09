import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function TodoForm( {addTask} ) {
    const [value, setValue] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue('')
    };

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" mb={2}>
          <TextField 
            fullWidth 
            variant="outlined" 
            label="Enter new task here or click the voice icon for voice input." 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Task
          </Button>
        </Box>
    );
}


export default TodoForm;