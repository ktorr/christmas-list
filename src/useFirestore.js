// import { useState, useEffect } from 'react';
// import { db, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, deleteDoc } from './Firebase';

// const useFirestore = (collectionName) => {
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setItems(data);
//         }, (error) => {
//             console.error('Error fetching data: ', error);
//         });

//         return () => unsubscribe();
//     }, [collectionName]);

//     const addItem = async (name, link) => {
//         try {
//             await addDoc(collection(db, collectionName), {
//                 name,
//                 link,
//                 createdAt: new Date(),
//             });
//             const querySnapshot = await getDocs(collection(db, collectionName));
//             const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setItems(data);
//         } catch (error) {
//             console.error('Error adding document: ', error);
//         }
//     };

//     const editItem = async (id, updatedName, updatedLink) => {
//         try {
//             const itemRef = doc(db, 'listItems', id);
//             await updateDoc(itemRef, {
//                 name: updatedName,
//                 link: updatedLink,
//             });
//             setItems((prevItems) =>
//                 prevItems.map((item) =>
//                     item.id === id ? { ...item, name: updatedName, link: updatedLink } : item
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating document: ', error);
//         }
//     };
    
//     const deleteItem = async (id) => {
//         const itemRef = doc(db, collectionName, id);
//         await deleteDoc(itemRef);
//         setItems(prevItems => prevItems.filter(item => item.id !== id));
//     };

//     const moveItem = async (id, name, link, purchased) => {
//         try {
//             const itemDoc = doc(db, collectionName, id);
//             await updateDoc(itemDoc, { purchased });
//             setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, purchased } : item));
//         } catch (error) {
//             console.error('Error moving document: ', error);
//         }
//     };

//     return { items, addItem, editItem, deleteItem, moveItem };
// };

// export default useFirestore;

import { useState, useEffect } from 'react';
import { db, collection, addDoc, getDoc, onSnapshot, doc, updateDoc, deleteDoc } from './Firebase';

const useFirestore = (listId) => {
    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const listRef = doc(db, 'lists', listId);
        const itemsRef = collection(listRef, 'listItems');

        // Fetch the list metadata
        // getDoc(listRef).then((doc) => {
        //     if (doc.exists()) {
        //         setList({ id: doc.id, ...doc.data() });
        //     } else {
        //         console.error('List not found');
        //     }
        // }).catch((error) => {
        //     console.error('Error fetching list: ', error);
        // });

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

