import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ItemCard from './ItemCard';

function SortableItemCard({ item, ...props }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <ItemCard
                item={item}
                isDragging={isDragging}
                dragHandleListeners={listeners}
                dragHandleAttributes={attributes}
                {...props}
            />
        </div>
    );
}

export default SortableItemCard;
