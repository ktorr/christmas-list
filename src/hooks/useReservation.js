import { db, collection, getDocs, doc, updateDoc, query, collectionGroup, where } from '../Firebase';
import LIST_IDS from '../constants/listIds';

const useReservation = (listId) => {
    const checkReservationLimit = async (reserverName) => {
        try {
            const reserverListId = LIST_IDS[reserverName];
            if (!reserverListId) return { allowed: false, error: 'Unknown user' };

            const [ownSnapshot, reservedSnapshot] = await Promise.all([
                getDocs(collection(db, 'lists', reserverListId, 'listItems')),
                getDocs(query(
                    collectionGroup(db, 'listItems'),
                    where('reserved', '==', true),
                    where('reservedBy', '==', reserverName)
                )),
            ]);

            const ownCount = ownSnapshot.size;
            const reservedCount = reservedSnapshot.size;

            return { allowed: reservedCount + 1 <= ownCount, ownCount, reservedCount };
        } catch (error) {
            console.error('Error checking reservation limit:', error);
            return { allowed: false, error: error.message };
        }
    };

    const reserveItem = async (itemId, reserverName) => {
        const check = await checkReservationLimit(reserverName);
        if (!check.allowed) {
            return { success: false, limitReached: true, ...check };
        }
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, { reserved: true, reservedBy: reserverName });
            return { success: true };
        } catch (error) {
            console.error('Error reserving item:', error);
            return { success: false, error: error.message };
        }
    };

    const unreserveItem = async (itemId) => {
        try {
            const itemRef = doc(db, 'lists', listId, 'listItems', itemId);
            await updateDoc(itemRef, { reserved: false, reservedBy: null });
            return { success: true };
        } catch (error) {
            console.error('Error unreserving item:', error);
            return { success: false, error: error.message };
        }
    };

    return { reserveItem, unreserveItem, checkReservationLimit };
};

export default useReservation;
