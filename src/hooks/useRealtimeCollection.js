import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

export default function useRealtimeCollection(queryRef) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrror] = useState(null);

    useEffect(() => {
        if (!queryRef) {
            setLoading(false);
            return;
        }

        const unsub = onSnapshot (
            queryRef, 
            (snap) => {
                const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                setData(docs);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching realtime collection:", err);
                setErrror(err);
                setLoading(false);
            }
        );
        return () => unsub();
    }, [queryRef]);
    
    return { data, loading, error };
}