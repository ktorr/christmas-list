import { useState, useEffect } from 'react';
import { db, collection, addDoc, getDoc, onSnapshot, doc, updateDoc, deleteDoc } from './Firebase';

const useFirestore = (listId) => {
    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const listRef = doc(db, 'lists', listId);
        const itemsRef = collection(listRef, 'listItems');

        // Subscribe to the items subcollection
        const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
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
            await addDoc(itemsRef, { name, link, purchased: false });
        } catch (error) {
            console.error('Error adding item: ', error);
        }
    };

    const editItem = async (itemId, updatedName, updatedLink) => {
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, { name: updatedName, link: updatedLink });
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

