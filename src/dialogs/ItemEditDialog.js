import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function ItemEditDialog({ open, item, onSave, onClose }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [link, setLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name || '');
            setPrice(item.price || '');
            setLink(item.link || '');
            setImageUrl(item.imageUrl || '');
        }
    }, [item]);

    const handleSave = () => {
        onSave(item.id, name.trim(), link.trim(), price.trim(), imageUrl.trim());
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ color: '#1A4568', fontWeight: 700 }}>Edit Item</DialogTitle>
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
                />
                <TextField
                    label="Image URL (optional)"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: '#C44D58' }}>Cancel</Button>
                <Button
                    onClick={handleSave}
                    disabled={!name.trim()}
                    variant="contained"
                    sx={{ backgroundColor: '#1A4568', '&:hover': { backgroundColor: '#0d2d45' } }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ItemEditDialog;
