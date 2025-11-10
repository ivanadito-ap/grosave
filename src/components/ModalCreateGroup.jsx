import { useState } from 'react';
import { X } from 'lucide-react';

export default function ModalCreateGroup({ isOpen, onClose, newGroup, setNewGroup, onCreateGroup, isLoading }) {
  const [memberEmail, setMemberEmail] = useState('');
  const [members, setMembers] = useState([]);

  const handleAddMember = () => {
    if (memberEmail && !members.includes(memberEmail)) {
      setMembers([...members, memberEmail]);
      setMemberEmail('');
    }
  };

  const handleRemoveMember = (email) => {
    setMembers(members.filter(member => member !== email));
  };

  const handleSubmit = () => {
    onCreateGroup({ ...newGroup, members });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-neutral text-white">
        <h3 className="font-bold text-lg mb-4">Create a New Group</h3>

        <div className="form-control mb-3">
          <label className="label">Household Name</label>
          <input
            type="text"
            placeholder="e.g. Kos Jogja A1"
            className="input input-bordered w-full"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            required
          />
        </div>

        <div className="form-control mb-3">
          <label className="label">Monthly Budget (Rp)</label>
          <input
            type="number"
            placeholder="e.g. 500000"
            className="input input-bordered w-full"
            value={newGroup.budget}
            onChange={(e) => setNewGroup({ ...newGroup, budget: e.target.value })}
            required
          />
        </div>

        <div className="form-control mb-3">
          <label className="label">Add Members (by email)</label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="member@email.com"
              className="input input-bordered flex-1"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
            <button 
              className="btn btn-secondary"
              onClick={handleAddMember}
              type="button"
            >
              Add
            </button>
          </div>
        </div>

        {members.length > 0 && (
          <div className="mb-4">
            <label className="label">Members</label>
            <div className="flex flex-wrap gap-2">
              {members.map((email) => (
                <div key={email} className="badge badge-primary gap-2">
                  {email}
                  <button 
                    onClick={() => handleRemoveMember(email)}
                    className="btn btn-ghost btn-xs"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-action">
          <button 
            className="btn btn-outline" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={isLoading || !newGroup.name || !newGroup.budget || members.length === 0}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}