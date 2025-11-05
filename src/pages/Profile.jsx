import React, { useEffect, useMemo, useState } from "react";
import { User, Mail, Calendar, MapPin, LogOut, Image as ImageIcon } from "lucide-react";
import { signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

  const joined = useMemo(() => {
    if (!currentUser?.metadata?.creationTime) return "";
    try {
      const d = new Date(currentUser.metadata.creationTime);
      return d.toLocaleString(undefined, { month: "long", year: "numeric" });
    } catch {
      return "";
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    setDisplayName(currentUser.displayName || currentUser.email?.split("@")[0] || "");
    setPhotoURL(
      currentUser.photoURL ||
        "https://api.dicebear.com/7.x/avataaars/svg?seed=GroSave&backgroundColor=b6e3f4,c0aede,d1d4f9"
    );
    try {
      const stored = localStorage.getItem(`gs_location_${currentUser.uid}`);
      setLocation(stored || "");
    } catch {
      setLocation("");
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const openEdit = () => {
    setError("");
    const el = document.getElementById("editProfileModal");
    if (el && el.showModal) el.showModal();
  };

  const closeEdit = () => {
    const el = document.getElementById("editProfileModal");
    if (el && el.close) el.close();
  };

  const handleSave = async (e) => {
    e?.preventDefault?.();
    if (!currentUser) return;
    setSaving(true);
    setError("");
    try {
      await updateProfile(currentUser, {
        displayName: displayName || null,
        photoURL: photoURL || null,
      });
      try {
        localStorage.setItem(`gs_location_${currentUser.uid}`, location || "");
      } catch {}
      setCurrentUser({ ...auth.currentUser });
      closeEdit();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content px-4 py-12">
      <div className="w-full max-w-md bg-neutral rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <img
            src={
              currentUser?.photoURL ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=GroSave&backgroundColor=b6e3f4,c0aede,d1d4f9"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-primary shadow-md mb-4"
          />

          {/* Name + Info */}
          <h1 className="text-3xl font-bold text-primary mb-2">
            {currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"}
          </h1>
          <p className="text-secondary mb-6">GroSave Member</p>

          {/* Details */}
          <div className="divider my-4"></div>
          <div className="w-full space-y-3 text-left">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={20} />
              <span>{currentUser?.email || "-"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={20} />
              <span>Joined {joined || "-"}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <span>{location || "Add your location"}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 text-center mt-8">
          <button onClick={openEdit} className="btn btn-outline btn-primary">
            <User size={18} />
            Edit Profile
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-error flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog id="editProfileModal" className="modal">
        <div className="modal-box bg-base-100">
          <form method="dialog">
            <button onClick={closeEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

          {error ? (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          ) : null}

          <form onSubmit={handleSave} className="space-y-4">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Display name</span></div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">Photo URL</span></div>
              <div className="join w-full">
                <input
                  type="url"
                  className="input input-bordered join-item w-full"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://..."
                />
                <a href={photoURL || "#"} target="_blank" rel="noreferrer" className="btn join-item" title="Preview">
                  <ImageIcon className="w-4 h-4" />
                </a>
              </div>
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">Location</span></div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
              />
            </label>

            <div className="modal-action">
              <button type="button" onClick={closeEdit} className="btn btn-ghost">Cancel</button>
              <button type="submit" className={`btn btn-primary ${saving ? "btn-disabled" : ""}`}>
                {saving ? <span className="loading loading-spinner loading-sm"></span> : null}
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

