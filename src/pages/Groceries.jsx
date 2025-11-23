import React, { useState, useEffect } from 'react';
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useGroceries from '../hooks/useGroceries';
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Groceries() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(true);

  useEffect(() => {
    const fetchUserGroups = async () => {
      if (!user) {
        setGroups([]);
        setGroupsLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'groups'),
          where('memberIds', 'array-contains', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const groupsData = querySnapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        }));
        setGroups(groupsData);
        if (groupsData.length > 0) {
          setSelectedGroupId(groupsData[0].id);
        } else {
          setSelectedGroupId(null);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setGroupsLoading(false);
      }
    };

    fetchUserGroups();
  }, [user]);

  const { groceries, loading: groceriesLoading, error, addGrocery, deleteGrocery } = useGroceries(selectedGroupId);
  const [formData, setFormData] = useState({ name: "", type: "Dairy", expiry: "" });
  const [isAdding, setIsAdding] = useState(false);

  // update input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // submit form
  const handleAddGrocery = async (e) => {
    e?.preventDefault();
    if (!formData.name || !formData.expiry) {
      alert("Please fill in all fields");
      return;
    }

    if (!selectedGroupId) {
      alert("Please select a group first");
      return;
    }

    setIsAdding(true);
    try {
      await addGrocery(formData);
      setFormData({ name: "", type: "Dairy", expiry: "" });
    } catch (error) {
      console.error("Error adding grocery:", error);
      alert("Failed to add grocery: " + (error?.message || error));
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteGrocery = async (groceryId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteGrocery(groceryId);
    } catch (error) {
      console.error("Error deleting grocery:", error);
      alert("Failed to delete grocery: " + (error?.message || error));
    }
  };

  if (groupsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content">
        <p className="text-xl mb-4">You don't have any groups yet</p>
        <button
          onClick={() => navigate("/groups")}
          className="btn btn-primary"
        >
          Create a Group First
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content px-4 py-10">
      <div className="w-full max-w-4xl bg-neutral rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-primary">🍎 My Groceries</h1>

        {/* Group Selector */}
        <div className="mb-6">
          <label className="label">
            <span className="label-text text-white">Select Group</span>
          </label>
          <select
            value={selectedGroupId || ""}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            className="select select-bordered w-full bg-base-200 text-white"
          >
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add Grocery Form */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Add New Item</h2>
          <form onSubmit={handleAddGrocery} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Item name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered bg-base-100 text-white"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="select select-bordered bg-base-100 text-white"
            >
              <option>Dairy</option>
              <option>Poultry</option>
              <option>Fruit</option>
              <option>Vegetable</option>
              <option>Meat</option>
              <option>Grains</option>
              <option>Other</option>
            </select>
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              className="input input-bordered bg-base-100 text-white"
              required
            />
            <button
              type="submit"
              disabled={isAdding}
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              {isAdding ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="alert alert-error mb-4">
            <p>{error.message || String(error)}</p>
          </div>
        )}

        {/* Loading State */}
        {groceriesLoading && (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Groceries Table */}
        {!groceriesLoading && groceries.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-md border border-base-300">
            <table className="table w-full">
              <thead className="bg-gradient-to-r from-primary to-secondary text-base-100">
                <tr>
                  <th className="text-white">#</th>
                  <th className="text-white">Name</th>
                  <th className="text-white">Type</th>
                  <th className="text-white">Expiry Date</th>
                  <th className="text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-base-200 text-base-content">
                {groceries.map((item, index) => (
                  <tr key={item.id} className="hover:bg-base-300 transition-colors">
                    <td>{index + 1}</td>
                    <td className="font-semibold">{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.expiry}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteGrocery(item.id)}
                        className="btn btn-sm btn-error btn-outline flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!groceriesLoading && groceries.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p className="text-lg">No groceries added yet.</p>
            <p className="text-sm">Start by adding your first item above!</p>
          </div>
        )}
      </div>
    </div>
  );
}