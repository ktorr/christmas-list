import { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, deleteDoc } from './Firebase';

const useFirestore = (collectionName) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(data);
        }, (error) => {
            console.error('Error fetching data: ', error);
        });

        return () => unsubscribe();
    }, [collectionName]);

    const addItem = async (name, link) => {
        try {
            await addDoc(collection(db, collectionName), {
                name,
                link,
                createdAt: new Date(),
            });
            const querySnapshot = await getDocs(collection(db, collectionName));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(data);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const editItem = async (id, updatedName, updatedLink) => {
        try {
            const itemRef = doc(db, 'listItems', id);
            await updateDoc(itemRef, {
                name: updatedName,
                link: updatedLink,
            });
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, name: updatedName, link: updatedLink } : item
                )
            );
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };
    
    const deleteItem = async (id) => {
        const itemRef = doc(db, collectionName, id);
        await deleteDoc(itemRef);
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const moveItem = async (id, name, link, purchased) => {
        try {
            const itemDoc = doc(db, collectionName, id);
            await updateDoc(itemDoc, { purchased });
            setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, purchased } : item));
        } catch (error) {
            console.error('Error moving document: ', error);
        }
    };

    return { items, addItem, editItem, deleteItem, moveItem };
};

export default useFirestore;