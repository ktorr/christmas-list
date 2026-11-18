import React, { useState, useRef, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function ItemCard({
    item,
    isOwnList,
    isEditMode,
    currentUser,
    onReserve,
    onUnreserve,
    onPurchased,
    onUnpurchased,
    onEditItem,
    onDeleteItem,
    dragHandleListeners,
    dragHandleAttributes,
    isDragging,
}) {
    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef(null);

    const isPurchased = !isOwnList && !!item.purchased;
    // Hide reserved badge on purchased items — it'll reappear when un-purchased
    const isReserved = !isOwnList && !!item.reserved && !item.purchased;
    const isReservedByMe = isReserved && item.reservedBy === currentUser;
    const isReservedByOther = isReserved && item.reservedBy !== currentUser;

    // Dismiss overlay when clicking outside
    useEffect(() => {
        if (!isSelected) return;
        const handleOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setIsSelected(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [isSelected]);

    const handleCardClick = () => {
        if (isEditMode) return;
        if (isOwnList) return;
        setIsSelected(prev => !prev);
    };

    const showOverlay = isSelected && !isEditMode && !isOwnList;

    const btnStyles = {
        width: '75%',
        fontWeight: 600,
        textTransform: 'none',
    };

    return (
        <Card
            ref={cardRef}
            onClick={handleCardClick}
            sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                opacity: isDragging ? 0.4 : isPurchased ? 0.5 : 1,
                filter: isPurchased ? 'grayscale(60%)' : 'none',
                cursor: isEditMode || isOwnList ? 'default' : 'pointer',
                transition: 'box-shadow 0.2s, opacity 0.2s',
                '&:hover': (!isEditMode && !isOwnList) ? { boxShadow: 6 } : {},
                userSelect: 'none',
            }}
        >
            {/* Reserved badge */}
            {isReserved && (
                <Chip
                    label={`Reserved by ${item.reservedBy}`}
                    size="small"
                    sx={{
                        position: 'absolute', top: 8, right: 8, zIndex: 2,
                        backgroundColor: '#C44D58', color: 'white',
                        fontWeight: 600, fontSize: '0.65rem',
                    }}
                />
            )}

            {/* Purchased badge */}
            {isPurchased && (
                <Chip
                    label="Purchased"
                    size="small"
                    sx={{
                        position: 'absolute', top: 8, right: 8, zIndex: 2,
                        backgroundColor: '#888', color: 'white', fontWeight: 600,
                    }}
                />
            )}

            {/* Drag handle — edit mode only */}
            {isEditMode && (
                <Box
                    {...dragHandleListeners}
                    {...dragHandleAttributes}
                    sx={{
                        position: 'absolute', top: 6, left: 6, zIndex: 2,
                        cursor: 'grab', color: '#aaa', display: 'flex', alignItems: 'center',
                        touchAction: 'none',
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <DragIndicatorIcon />
                </Box>
            )}

            {/* Edit + Delete icons — edit mode only */}
            {isEditMode && (
                <Box
                    sx={{ position: 'absolute', top: 4, right: 4, zIndex: 2, display: 'flex', gap: 0.5 }}
                    onClick={e => e.stopPropagation()}
                >
                    <IconButton
                        size="small"
                        onClick={() => onEditItem(item)}
                        sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--theme-primary)' }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => onDeleteItem(item.id)}
                        sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#C44D58' }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}

            {/* Visit button — own list non-edit mode */}
            {isOwnList && !isEditMode && item.link && (
                <IconButton
                    size="small"
                    onClick={e => {
                        e.stopPropagation();
                        window.open(item.link, '_blank', 'noopener,noreferrer');
                    }}
                    sx={{
                        position: 'absolute', top: 6, right: 6, zIndex: 2,
                        backgroundColor: 'rgba(255,255,255,0.85)', color: 'var(--theme-primary)',
                    }}
                >
                    <OpenInNewIcon fontSize="small" />
                </IconButton>
            )}

            {/* Image */}
            {item.imageUrl ? (
                <CardMedia
                    component="img"
                    height="160"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ objectFit: 'cover', flexShrink: 0 }}
                />
            ) : (
                <Box sx={{
                    height: 160, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                }}>
                    <CardGiftcardIcon sx={{ fontSize: 72, color: '#ccc' }} />
                </Box>
            )}

            {/* Text content */}
            <CardContent sx={{ flexGrow: 1, pb: '12px !important' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--theme-primary)', lineHeight: 1.3 }}>
                    {item.name}
                </Typography>
                {item.price && (
                    <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                        {item.price}
                    </Typography>
                )}
            </CardContent>

            {/* Click overlay for other's list */}
            {showOverlay && (
                <Box sx={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.65)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 1.5, borderRadius: 'inherit', zIndex: 3,
                }}>
                    {isPurchased ? (
                        <Button
                            variant="contained"
                            onClick={e => {
                                e.stopPropagation();
                                setIsSelected(false);
                                onUnpurchased(item.id);
                            }}
                            sx={{ ...btnStyles, backgroundColor: '#757575', '&:hover': { backgroundColor: '#616161' } }}
                        >
                            Un-purchase
                        </Button>
                    ) : (
                        <>
                            {item.link && (
                                <Button
                                    variant="contained"
                                    startIcon={<OpenInNewIcon />}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setIsSelected(false);
                                        window.open(item.link, '_blank', 'noopener,noreferrer');
                                    }}
                                    sx={{ ...btnStyles, backgroundColor: 'var(--theme-primary)', '&:hover': { backgroundColor: 'var(--theme-primary-dark)' } }}
                                >
                                    Visit
                                </Button>
                            )}
                            {!isReservedByOther && (
                                <Button
                                    variant="contained"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setIsSelected(false);
                                        isReservedByMe ? onUnreserve(item.id) : onReserve(item);
                                    }}
                                    sx={{
                                        ...btnStyles,
                                        backgroundColor: isReservedByMe ? '#757575' : '#C44D58',
                                        '&:hover': { backgroundColor: isReservedByMe ? '#616161' : '#a63d49' },
                                    }}
                                >
                                    {isReservedByMe ? 'Un-reserve' : 'Reserve'}
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={e => {
                                    e.stopPropagation();
                                    setIsSelected(false);
                                    onPurchased(item);
                                }}
                                sx={{ ...btnStyles, backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                            >
                                Purchased
                            </Button>
                        </>
                    )}
                </Box>
            )}
        </Card>
    );
}

export default ItemCard;
