import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useFirestore } from '../useFirestore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

function EditButton({item, onSave}) {
    const [editOpen, setEditOpen] = useState(false);
    const [name, setName] = useState(item.name);
    const [link, setLink] = useState(item.link);
    const [order, setOrder] = useState(item.order);

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleSave = () => {
        if (name.trim()) {
            onSave(item.id, name.trim(), link.trim(), order);
            handleEditClose();
        }
    };

    return (
        <div>
            <Tooltip title="Edit"
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
                <IconButton className="edit-button" onClick={handleEditOpen} size="small" sx={{color:'#274235'}}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle sx={{color: '#274235'}}>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
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
                        label="Item Order"
                        type="number" // Input for order
                        fullWidth
                        variant="standard"
                        value={order}
                        onChange={(e) => setOrder(Number(e.target.value))} // Convert value to a number
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
                    <Button onClick={handleEditClose} sx={{color: '#8B0000'}}>Cancel</Button>
                    <Button onClick={handleSave} sx={{backgroundColor: '#274235', color: 'white'}}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditButton;