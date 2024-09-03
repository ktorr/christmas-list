import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import useFirestore from '../useFirestore';
import Tooltip from '@mui/material/Tooltip';

function AddButton({listId}) {
    const [open, setOpen] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [newItemLink, setNewItemLink] = useState('');
    const { addItem }  = useFirestore(listId);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleAdd = () => {
        if (newItem.trim()) {
            addItem(newItem.trim(), newItemLink.trim());
            setNewItem('');
            setNewItemLink('');
            handleClose();
        }
    };

    const handleCancel = () => {
        setNewItem('');
        setNewItemLink('');
        handleClose();
    };

    return (
        <div>
            <Tooltip title="Add New Item"
                PopperProps={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -5], // Adjust the offset to move tooltip
                            },
                        },
                    ],
                }}>
                <IconButton aria-label="add" size="medium" sx={{marginLeft: '5px', color: '#274235'}} onClick={handleOpen}>
                    <AddIcon sx={{fontSize: '35px'}}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{color:'#274235'}}>Add New Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        sx={{
                            '& .MuiInput-underline:hover:before': {
                                borderBottomColor: '#274235',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#274235',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#274235',
                            }
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Item Link"
                        type="url"
                        fullWidth
                        variant="standard"
                        value={newItemLink}
                        onChange={(e) => setNewItemLink(e.target.value)}
                        sx={{
                            '& .MuiInput-underline:hover:before': {
                                borderBottomColor: '#274235',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#274235',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#274235',
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} sx={{color:'#8B0000'}}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={!newItem.trim()} sx={{backgroundColor:'#274235', color:'white', '&:disabled': {
                        backgroundColor: 'lightgray', color: 'darkgray'}}}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        
    );
}

export default AddButton;