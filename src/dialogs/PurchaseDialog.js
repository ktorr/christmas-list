import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function PurchaseDialog({ open, item, onConfirm, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ color: 'var(--theme-primary)', fontWeight: 700 }}>Confirm Purchase</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Have you purchased <strong>{item?.name}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: '#C44D58' }}>Cancel</Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{ backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                >
                    Yes, Purchased!
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PurchaseDialog;
