import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import SortableItemCard from './SortableItemCard';
import ItemCard from './ItemCard';

const gridSx = {
    display: 'grid',
    gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
    },
    gap: '20px',
    padding: '20px',
};

function ItemGrid({
    items,
    isOwnList,
    isEditMode,
    currentUser,
    onReserve,
    onUnreserve,
    onPurchased,
    onUnpurchased,
    onEditItem,
    onDeleteItem,
    onReorderComplete,
}) {
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 5 },
    }));

    const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

    // Own list: show all items in order, no purchased distinction
    // Other's list: non-purchased in order, then purchased at end
    const displayItems = isOwnList
        ? sorted
        : [
            ...sorted.filter(i => !i.purchased),
            ...sorted.filter(i => i.purchased),
        ];

    const commonProps = {
        isOwnList,
        isEditMode,
        currentUser,
        onReserve,
        onUnreserve,
        onPurchased,
        onUnpurchased,
        onEditItem,
        onDeleteItem,
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const sortableItems = isOwnList
            ? displayItems
            : displayItems.filter(i => !i.purchased);

        const oldIndex = sortableItems.findIndex(i => i.id === active.id);
        const newIndex = sortableItems.findIndex(i => i.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        const reordered = arrayMove(sortableItems, oldIndex, newIndex);
        onReorderComplete(reordered.map(i => i.id));
    };

    if (items.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography sx={{ color: '#888' }}>No items yet.</Typography>
            </Box>
        );
    }

    if (isEditMode && isOwnList) {
        return (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={displayItems.map(i => i.id)} strategy={rectSortingStrategy}>
                    <Box sx={gridSx}>
                        {displayItems.map(item => (
                            <SortableItemCard key={item.id} item={item} {...commonProps} />
                        ))}
                    </Box>
                </SortableContext>
            </DndContext>
        );
    }

    return (
        <Box sx={gridSx}>
            {displayItems.map(item => (
                <ItemCard key={item.id} item={item} {...commonProps} />
            ))}
        </Box>
    );
}

export default ItemGrid;
