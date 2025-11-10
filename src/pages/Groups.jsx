import { useEffect, useState } from "react";
import { PlusCircle, Users } from "lucide-react";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ModalCreateGroup from "../components/ModalCreateGroup";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", budget: "" });
  const [isLoading, setIsLoading] = useState(true); // Changed to true initially
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async (user) => {
      try {
        const q = query(
          collection(db, 'groups'),
          where('memberIds', 'array-contains', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const groupsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchGroups(user);
      } else {
        setGroups([]);
        setIsLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleCreateGroup = async (groupData) => {
    if (!groupData.name || !groupData.budget || groupData.members.length === 0) {
      alert("Please fill in all fields and add at least one member");
      return;
    }

    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "groups"), {
        name: groupData.name,
        budget: parseInt(groupData.budget),
        members: [...groupData.members, auth.currentUser?.email], // Include current user
        memberIds: [auth.currentUser?.uid], // Store user IDs for security rules
        createdAt: new Date(),
        createdBy: auth.currentUser?.uid
      });

      const newGroupData = {
        id: docRef.id,
        ...groupData,
        members: [...groupData.members, auth.currentUser?.email],
        memberIds: [auth.currentUser?.uid],
        createdAt: new Date(),
        createdBy: auth.currentUser?.uid
      };

      setGroups(prevGroups => [...prevGroups, newGroupData]);
      setNewGroup({ name: "", budget: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-white px-6 pt-24 pb-10">
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center mt-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="alert alert-error mt-20">
            <p>{error}</p>
          </div>
        )}

        {/* Groups Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="card bg-neutral text-white shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="card-body">
                  <h2 className="card-title text-primary">{group.name}</h2>
                  <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
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
        )}

        {/* Empty State */}
        {!isLoading && !error && groups.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            <p>You haven't joined or created any groups yet.</p>
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
      <ModalCreateGroup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newGroup={newGroup}
        setNewGroup={setNewGroup}
        onCreateGroup={handleCreateGroup}
        isLoading={isLoading}
      />
    </div>
  );
}
