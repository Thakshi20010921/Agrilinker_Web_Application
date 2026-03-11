import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const normalizeRole = (role) =>
    String(role || "")
        .toUpperCase()
        .replace(/^ROLE_/, "")
        .replace(/[\s_-]/g, "");

const defaultPathForRoles = (roles = []) => {
    const r = roles.map(normalizeRole);

    if (r.includes("ADMIN")) return "/admin";
    if (r.includes("FARMER")) return "/farmer/dashboard";
    if (r.includes("FERTILIZERSUPPLIER")) return "/fertilizer-dashboard";
    if (r.includes("BUYER")) return "/marketplace";

    return "/home";
};

export default function RoleRedirect() {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // If not logged in, go login
    if (!user) return <Navigate to="/login" replace />;

    // If user came from a protected route, go back there after login
    const from = location.state?.from;

    // Otherwise go to their role dashboard
    return (
        <Navigate
            to={from || defaultPathForRoles(user?.roles || [])}
            replace
        />
    );
}
