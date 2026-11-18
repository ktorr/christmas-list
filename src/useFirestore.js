import { useState, useEffect } from 'react';
import { db, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from './Firebase';

const useFirestore = (listId) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const listRef = doc(db, 'lists', listId);
        const itemsRef = collection(listRef, 'listItems');
        const itemsQuery = query(itemsRef, orderBy('order', 'asc'));

        const unsubscribe = onSnapshot(itemsQuery, (snapshot) => {
            const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setItems(data);
        }, (error) => {
            console.error('Error fetching items: ', error);
        });

        return () => unsubscribe();
    }, [listId]);

    const addItem = async (name, link, price, imageUrl) => {
        try {
            const itemsRef = collection(db, 'lists', listId, 'listItems');
            const nextOrder = items.length > 0 ? Math.max(...items.map(item => item.order || 0)) + 1 : 1;
            await addDoc(itemsRef, {
                name,
                link: link || '',
                price: price || '',
                imageUrl: imageUrl || '',
                purchased: false,
                reserved: false,
                reservedBy: null,
                order: nextOrder,
            });
        } catch (error) {
            console.error('Error adding item: ', error);
        }
    };

    const editItem = async (itemId, name, link, price, imageUrl) => {
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, {
                name,
                link: link || '',
                price: price || '',
                imageUrl: imageUrl || '',
            });
        } catch (error) {
            console.error('Error editing item: ', error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await deleteDoc(itemRef);
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };

    const markPurchased = async (itemId) => {
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, { purchased: true });
        } catch (error) {
            console.error('Error marking item purchased: ', error);
        }
    };

    const unmarkPurchased = async (itemId) => {
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, { purchased: false });
        } catch (error) {
            console.error('Error unmarking item purchased: ', error);
        }
    };

    const reorderItems = async (orderedIds) => {
        try {
            await Promise.all(
                orderedIds.map((id, index) => {
                    const itemRef = doc(db, 'lists', listId, 'listItems', id);
                    return updateDoc(itemRef, { order: index + 1 });
                })
            );
        } catch (error) {
            console.error('Error reordering items: ', error);
        }
    };

    return { items, addItem, editItem, deleteItem, markPurchased, unmarkPurchased, reorderItems };
};

export default useFirestore;
