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
            <Tooltip title="Delete"
                PopperProps={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -15], // Adjust the offset to move tooltip
                            },
                        },
                    ],
                }}>
                <IconButton onClick={handleDeleteOpen} size="medium" sx={{color:'#1A4568', marginRight:'5px'}}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                <DialogTitle sx={{color:'#1A4568', fontWeight:'500'}}>Delete Item</DialogTitle>
                <DialogContent sx={{color:'#1A4568', fontSize:'20px'}}>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} sx={{color:'#1A4568'}}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} sx={{backgroundColor:'#C44D58', color:'white'}}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteButton;