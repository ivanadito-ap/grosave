import React from "react";
import { User, Mail, Calendar, MapPin, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // Temporary mock user data
  const user = {
    name: "Haru Urara",
    email: "haru@urara.com",
    joined: "January 2024",
    location: "Ciledug, Indonesia",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Raditya&backgroundColor=b6e3f4,c0aede,d1d4f9",
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content px-4 py-12">
      <div className="w-full max-w-md bg-neutral rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-primary shadow-md mb-4"
          />

          {/* Name + Info */}
          <h1 className="text-3xl font-bold text-primary mb-2">
            {user.name}
          </h1>
          <p className="text-secondary mb-6">Front Runner 🌱</p>

          {/* Details */}
          <div className="divider my-4"></div>
          <div className="w-full space-y-3 text-left">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={20} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={20} />
              <span>Joined {user.joined}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <span>{user.location}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 text-center mt-8">
          <button className="btn btn-outline btn-primary">
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
    </div>
  );
}
