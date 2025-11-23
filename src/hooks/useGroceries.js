import { useCallback, useMemo } from 'react';
import { collection, addDoc, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useRealtimeCollection from './useRealtimeCollection';

export default function useGroceries(groupId) {
  // Create a new query every time groupId changes
  const groceriesQuery = useMemo(() => {
    if (!groupId) {
      return null;
    }
    return query(collection(db, 'groceries'), where('groupId', '==', groupId));
  }, [groupId]); // Re-create query when groupId changes

  const { data: groceries, loading, error } = useRealtimeCollection(groceriesQuery);

  const addGrocery = useCallback(async (groceryData) => {
    if (!groupId) throw new Error('Group not selected');
    
    const docRef = await addDoc(collection(db, 'groceries'), {
      name: groceryData.name,
      type: groceryData.type,
      expiry: groceryData.expiry,
      groupId, // Make sure groupId is included
      createdAt: new Date(),
      quantity: groceryData.quantity || 1
    });

    return { id: docRef.id, ...groceryData };
  }, [groupId]);

  const updateGrocery = useCallback(async (groceryId, updates) => {
    await updateDoc(doc(db, 'groceries', groceryId), updates);
  }, []);

  const deleteGrocery = useCallback(async (groceryId) => {
    await deleteDoc(doc(db, 'groceries', groceryId));
  }, []);

  return { groceries, loading, error, addGrocery, updateGrocery, deleteGrocery };
}