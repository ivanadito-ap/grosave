import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Groceries() {
  const groupId = "2jMLi9hAYz0IQWSEh1Kt";
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);

  // input states
  const [newItem, setNewItem] = useState("");
  const [type, setType] = useState("");
  const [boughtDate, setBoughtDate] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    console.log("🔍 Setting up listener for group:", groupId);
    const groceriesRef = collection(db, "groups", groupId, "groceries");
    const q = query(groceriesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("✅ Snapshot triggered. Docs:", snapshot.docs.length);
        snapshot.docs.forEach((d) =>
          console.log("📄", d.id, "=>", d.data())
        );
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroceries(items);
        setLoading(false);
      },
      (err) => {
        console.error("❌ Firestore snapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [groupId]);

  const addGrocery = async () => {
    try {
      const user = auth.currentUser;
      console.log("🧾 Adding grocery as:", user?.email);
      await addDoc(collection(db, "groups", groupId, "groceries"), {
        name: newItem || "Unnamed",
        type: type || "Unknown",
        boughtDate: boughtDate || "N/A",
        expiry: expiry || "N/A",
        createdAt: serverTimestamp(),
        createdBy: user?.email || "anonymous",
      });
      setNewItem("");
      setType("");
      setBoughtDate("");
      setExpiry("");
    } catch (err) {
      console.error("❌ AddDoc error:", err);
    }
  };

 const deleteGrocery = async (id) => {
  console.log("🗑️ Trying to delete grocery:", id);
  try {
    await deleteDoc(doc(db, "groups", groupId, "groceries", id));
    console.log("✅ Deleted successfully");
  } catch (err) {
    console.error("❌ Delete error:", err);
    alert("Delete failed: " + err.message);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-100 text-primary px-4 py-10">
      <div className="w-full max-w-4xl bg-neutral rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          🍎 Group Groceries
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          <div className="flex flex-col">
            <label className="text-xs text-secondary mb-1">Item Name</label>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="e.g. Milk"
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-secondary mb-1">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g. Dairy"
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-secondary mb-1">Date Bought</label>
            <input
              type="date"
              value={boughtDate}
              onChange={(e) => setBoughtDate(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-secondary mb-1">Expiry Date</label>
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="flex items-end">
            <button onClick={addGrocery} className="btn btn-primary w-full">
              Add
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-sm text-secondary opacity-70">
            Loading your groceries...
          </p>
        ) : groceries.length === 0 ? (
          <p className="text-center text-sm opacity-70">
            No groceries yet. Try adding one!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr className="text-secondary">
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Type</th>
                  <th>Date Bought</th>
                  <th>Expiry Date</th>
                  <th>Added By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groceries.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td className="font-semibold">{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.boughtDate}</td>
                    <td>{item.expiry}</td>
                    <td className="text-xs opacity-70">
                      {item.createdBy || "—"}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteGrocery(item.id)}
                        className="btn btn-error btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
