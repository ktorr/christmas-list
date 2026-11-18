import { useState, useEffect } from 'react';
import { db, doc, onSnapshot, setDoc } from '../Firebase';

const EMPTY_ANSWERS = {
    color: '',
    candy: '',
    drinks: '',
    shops: '',
    restaurants: '',
    hobbies: '',
    sportsTeam: '',
    moviesBooks: '',
    scents: '',
    sizing: '',
};

export function useSecretSanta(listId) {
    const [answers, setAnswers] = useState(EMPTY_ANSWERS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!listId) return;
        const unsub = onSnapshot(doc(db, 'lists', listId), (snap) => {
            const data = snap.data();
            setAnswers(data?.secretSanta ? { ...EMPTY_ANSWERS, ...data.secretSanta } : EMPTY_ANSWERS);
            setLoading(false);
        });
        return unsub;
    }, [listId]);

    const saveAnswers = async (newAnswers) => {
        await setDoc(doc(db, 'lists', listId), { secretSanta: newAnswers }, { merge: true });
    };

    return { answers, loading, saveAnswers };
}
