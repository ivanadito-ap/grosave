import { useCallback, useMemo } from 'react';
import { collection, addDoc, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useRealtimeCollection from './useRealtimeCollection';

export default function useGroceries(groupId) {
    const groceriesQuery = useMemo(() => {
        return groupId
            ? query(collection(db, 'groceries'), where('groupId', '==', groupId))
            : null;
    }, [groupId]);

    const { data: groceries, loading, error } = useRealtimeCollection(groceriesQuery);

    const addGrocery = useCallback(async (groceryData) => {
        if (!groupId) throw new Error('Group not selected');

        const docRef = await addDoc(collection(db, 'groceries'), {
            ...groceryData,
            groupId,
            createdAt: new Date(),
        });

        return { id: docRef.id, ...groceryData };
    }, [groupId]);

    const updateGrocery = useCallback(async (groceryId, updates) => {
        await updateDoc(doc(db, 'groceries', groceryId));
    }, []);

    const deleteGrocery = useCallback(async (groceryId) => {
        await deleteDoc(doc(db, 'groceries', groceryId));
    }, []);

    return { groceries, loading, error, addGrocery, updateGrocery, deleteGrocery };
}