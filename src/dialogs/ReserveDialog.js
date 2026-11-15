import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const NAMES = [
    'Aba', 'Abu', 'Anthony', 'Bill', 'Emmie', 'Evelyn', 'Grace', 'John',
    'Kennedy', 'Lynda', 'Madison', 'Maria', 'Mateo', 'Matthew', 'Max',
    'Nicolas', 'Paul', 'Ron',
];

function ReserveDialog({ open, item, currentUser, onConfirm, onClose }) {
    const [selectedName, setSelectedName] = useState(currentUser || NAMES[0]);

    useEffect(() => {
        if (open) setSelectedName(currentUser || NAMES[0]);
    }, [open, currentUser]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ color: '#1A4568', fontWeight: 700 }}>Reserve Item</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DialogContentText>
                    Reserve <strong>{item?.name}</strong> for:
                </DialogContentText>
                <select
                    value={selectedName}
                    onChange={e => setSelectedName(e.target.value)}
                    style={{
                        width: '100%', padding: '8px', fontSize: '1rem',
                        borderColor: '#1A4568', borderWidth: '2px',
                        borderRadius: '4px', color: '#1A4568', cursor: 'pointer',
                    }}
                >
                    {NAMES.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: '#C44D58' }}>Cancel</Button>
                <Button
                    onClick={() => onConfirm(selectedName)}
                    variant="contained"
                    sx={{ backgroundColor: '#1A4568', '&:hover': { backgroundColor: '#0d2d45' } }}
                >
                    Reserve
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReserveDialog;
