import React, { useState } from 'react';

function TodoForm({ addTask }) {
    const [value, setValue] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '16px' }}>
            <input
                type="text"
                placeholder="Enter new task here or click Start for voice commands."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                    flexGrow: 1,
                    padding: '8px',
                    marginRight: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                }}
            />
            <button type="submit" style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
            }}>
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;
