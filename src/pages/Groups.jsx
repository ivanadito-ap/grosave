// src/pages/Groups.jsx
import { useState } from "react";
import { PlusCircle, Users } from "lucide-react";

export default function Groups() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Kos Jogja A1",
      members: ["Fariz", "Daafi", "Sultan"],
      budget: 350000,
    },
    {
      id: 2,
      name: "Family Weekly Groceries",
      members: ["Mom", "Dad", "Sis"],
      budget: 500000,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", budget: "" });

  const handleCreateGroup = () => {
    if (!newGroup.name) return;
    setGroups([
      ...groups,
      {
        id: groups.length + 1,
        name: newGroup.name,
        members: ["You"],
        budget: parseInt(newGroup.budget) || 0,
      },
    ]);
    setNewGroup({ name: "", budget: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-base-100 text-white px-6 py-11">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Groups</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusCircle size={20} />
            New Group
          </button>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="card bg-neutral text-white shadow-xl hover:scale-[1.02] transition-all"
            >
              <div className="card-body">
                <h2 className="card-title text-primary">{group.name}</h2>
                <p className="flex items-center gap-2 text-sm text-gray-300">
                  <Users size={16} /> {group.members.join(", ")}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Budget: Rp {group.budget.toLocaleString()}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-outline btn-accent">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {groups.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            <p>You haven’t joined or created any groups yet.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary mt-4"
            >
              Create Your First Group
            </button>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-neutral text-white">
            <h3 className="font-bold text-lg mb-4">Create a New Group</h3>

            <div className="form-control mb-3">
              <label className="label">Group Name</label>
              <input
                type="text"
                placeholder="e.g. Kos Jogja A1"
                className="input input-bordered w-full"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">Monthly Budget (Rp)</label>
              <input
                type="number"
                placeholder="e.g. 500000"
                className="input input-bordered w-full"
                value={newGroup.budget}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, budget: e.target.value })
                }
              />
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateGroup}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
