import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const email = localStorage.getItem("email");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  const hasRole = (targetRole) =>
    roles.some((r) => {
      const role = String(r).toUpperCase();
      const t = String(targetRole).toUpperCase();
      return role === t || role === `ROLE_${t}`;
    });

  const isAdmin = hasRole("ADMIN");

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login");
  };

  const goProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  const goAdmin = () => {
    setOpen(false);
    navigate("/admin");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <span
        className="text-3xl text-white hover:text-green-300 cursor-pointer select-none"
        onClick={() => setOpen((v) => !v)}
      >
        👤
      </span>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
          {/* User Info */}
          <div className="px-4 py-3 border-b bg-gray-50">
            <p className="font-semibold text-gray-800">
              {email ? email.split("@")[0] : "User"}
            </p>
            <p className="text-xs text-gray-500">{email || "No email"}</p>

            {roles.length > 0 && (
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                {String(roles[0]).toUpperCase()}
              </span>
            )}
          </div>

          <div className="py-2">
            {isAdmin && (
              <button
                onClick={goAdmin}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Admin Dashboard
              </button>
            )}

            <button
              onClick={goProfile}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              My Profile
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
