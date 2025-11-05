// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, Users, ShoppingBasket, User, Menu } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/groups", label: "Groups", icon: Users },
    { path: "/groceries", label: "Groceries", icon: ShoppingBasket },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="navbar bg-base-100/70 backdrop-blur-md fixed top-0 z-50">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 ${
                      location.pathname === item.path ? "active text-primary" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl font-bold">
          🛒 GroSave
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 transition-all duration-200 outline-none ${
                    location.pathname === item.path
                      ? "!text-primary font-semibold !bg-base-100"
                      : "hover:bg-base-100 hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-end">
        <span className="badge badge-primary">Prototype</span>
      </div>
    </div>
  );
}

export default Navbar;
