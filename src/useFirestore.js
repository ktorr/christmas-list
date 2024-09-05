import { useState, useEffect } from 'react';
import { db, collection, addDoc, getDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from './Firebase';

const useFirestore = (listId) => {
    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const listRef = doc(db, 'lists', listId);
        const itemsRef = collection(listRef, 'listItems');
        const itemsQuery = query(itemsRef, orderBy('order', 'asc'));

        // Subscribe to the items subcollection
        const unsubscribe = onSnapshot(itemsQuery, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(data);
        }, (error) => {
            console.error('Error fetching items: ', error);
        });

        return () => unsubscribe();
    }, [listId]);

    const addItem = async (name, link) => {
        try {
            const itemsRef = collection(db, 'lists', listId, 'listItems');
            let nextOrder = items.length > 0 ? Math.max(...items.map(item => item.order)) + 1 : 1;
            await addDoc(itemsRef, { name, link, purchased: false, order: nextOrder });
        } catch (error) {
            console.error('Error adding item: ', error);
        }
    };

    const editItem = async (itemId, updatedName, updatedLink, updatedOrder) => {
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, { name: updatedName, link: updatedLink, order: updatedOrder });
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

    const moveItem = async (itemId, newPurchased) => {
        try {
            //const newPurchased = !currentPurchased;
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, { purchased: newPurchased });
            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, purchased: newPurchased } : item
                )
            );
        } catch (error) {
            console.error('Error moving item: ', error);
        }
    };

    return { list, items, addItem, editItem, deleteItem, moveItem };
};

export default useFirestore;

