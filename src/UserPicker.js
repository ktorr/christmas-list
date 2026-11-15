import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useUser } from './UserContext';

const NAMES = [
    'Aba', 'Abu', 'Anthony', 'Bill', 'Emmie', 'Evelyn', 'Grace', 'John',
    'Kennedy', 'Lynda', 'Madison', 'Maria', 'Mateo', 'Matthew', 'Max',
    'Nicolas', 'Paul', 'Ron'
];

function UserPicker() {
    const { currentUser, updateUser } = useUser();
    const [selected, setSelected] = useState(NAMES[0]);

    return (
        <Dialog open={!currentUser} disableEscapeKeyDown>
            <DialogTitle sx={{ color: '#1A4568', fontWeight: 700 }}>Who are you?</DialogTitle>
            <DialogContent>
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        fontSize: '1rem',
                        borderColor: '#1A4568',
                        borderWidth: '2px',
                        borderRadius: '4px',
                        color: '#1A4568',
                        cursor: 'pointer',
                    }}
                >
                    {NAMES.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => updateUser(selected)}
                    sx={{ backgroundColor: '#1A4568', color: 'white', '&:hover': { backgroundColor: '#0d2d45' } }}
                >
                    Let's go!
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserPicker;
