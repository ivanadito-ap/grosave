import { useCallback, useMemo } from 'react';
import { collection, addDoc, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useRealtimeCollection from './useRealtimeCollection';

export default function useGroups(userId) {
  const groupsQuery = useMemo(() => {
    return userId 
      ? query(collection(db, 'groups'), where('memberIds', 'array-contains', userId))
      : null;
  }, [userId]);

  const { data: groups, loading, error } = useRealtimeCollection(groupsQuery);

  const createGroup = useCallback(async (groupData) => {
    if (!userId) throw new Error('User not authenticated');
    
    const docRef = await addDoc(collection(db, 'groups'), {
      name: groupData.name,
      budget: parseInt(groupData.budget),
      members: [...groupData.members, groupData.currentUserEmail],
      memberIds: [userId],
      createdAt: new Date(),
      createdBy: userId
    });

    return { id: docRef.id, ...groupData };
  }, [userId]);

  const updateGroup = useCallback(async (groupId, updates) => {
    await updateDoc(doc(db, 'groups', groupId), updates);
  }, []);

  const deleteGroup = useCallback(async (groupId) => {
    await deleteDoc(doc(db, 'groups', groupId));
  }, []);

  return { groups, loading, error, createGroup, updateGroup, deleteGroup };
}