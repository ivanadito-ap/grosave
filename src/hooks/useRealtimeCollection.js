import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

export default function useRealtimeCollection(queryRef) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!queryRef) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true); // Set loading to true when query changes
    const unsub = onSnapshot(
      queryRef,
      (snap) => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore subscription error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [queryRef]);

  return { data, loading, error };
}