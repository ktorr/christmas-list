import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoveIcon from '@mui/icons-material/SyncAlt';

function MoveButton({item, onMove}) {
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMove = () => {
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
                <IconButton className="move-button" onClick={handleMove} size="medium" sx={{color:'#274235'}}>
                {isMobileView ? (
                        <MoveIcon sx={{transform:'rotate(90deg) scaleY(-1)'}}/> // Mobile
                    ) : (
                        <MoveIcon /> // Default
                    )}
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default MoveButton;