import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoveIcon from '@mui/icons-material/DriveFileMove';
import Tooltip from '@mui/material/Tooltip';

function MoveButton({item, onMove}) {
    const handleMove = () => {
        // onMove(item.id, item.name, item.link, item.purchased);
        onMove(item.id, item.purchased);
    };

    return (
        <div>
            <Tooltip title={item.purchased ? "Move to List" : "Move to Purchased"} 
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
                <IconButton className="move-button" onClick={handleMove} size="small" sx={{color:'#274235'}}>
                    <MoveIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default MoveButton;