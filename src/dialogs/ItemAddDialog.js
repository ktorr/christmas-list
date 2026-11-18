import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function ItemAddDialog({ open, onAdd, onClose }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [link, setLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const reset = () => {
        setName('');
        setPrice('');
        setLink('');
        setImageUrl('');
    };

    const handleAdd = () => {
        onAdd(name.trim(), link.trim(), price.trim(), imageUrl.trim());
        reset();
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ color: 'var(--theme-primary)', fontWeight: 700 }}>Add Item</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
                <TextField
                    label="Item Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    fullWidth
                    autoFocus
                />
                <TextField
                    label="Price (optional)"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    fullWidth
                    placeholder="e.g. $24.99"
                />
                <TextField
                    label="Link (optional)"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    fullWidth
                    placeholder="https://..."
                />
                <TextField
                    label="Image URL (optional)"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    fullWidth
                    placeholder="https://..."
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#C44D58' }}>Cancel</Button>
                <Button
                    onClick={handleAdd}
                    disabled={!name.trim()}
                    variant="contained"
                    sx={{ backgroundColor: 'var(--theme-primary)', '&:hover': { backgroundColor: 'var(--theme-primary-dark)' } }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ItemAddDialog;
