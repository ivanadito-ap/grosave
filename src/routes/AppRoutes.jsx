import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Groups from "../pages/Groups";
import Profile from "../pages/Profile";
import Groceries from "../pages/Groceries";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import LearnMore from "../pages/LearnMore";

export default function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        {user ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/learn-more" element={<LearnMore/>}></Route>
            <Route path="/groups" element={<Groups />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}