import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useFirestore from '../useFirestore';
import Tooltip from '@mui/material/Tooltip';

function DeleteButton({item, onDelete}) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDeleteConfirm = () => {
        onDelete(item.id);
        handleDeleteClose();
    };

    return (
        <div>
            <Tooltip title="Delete">
                <IconButton onClick={handleDeleteOpen} size="small" sx={{color:'#8B0000', marginRight:'5px'}}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                <DialogTitle sx={{color:'#274235', fontWeight:'500'}}>Delete Item</DialogTitle>
                <DialogContent sx={{color:'#274235', fontSize:'20px'}}>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} sx={{color:'#274235'}}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} sx={{backgroundColor:'#8B0000', color:'white'}}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteButton;