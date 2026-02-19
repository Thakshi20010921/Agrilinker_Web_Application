import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const normalizeRole = (role) =>
    String(role || "")
        .toUpperCase()
        .replace(/^ROLE_/, "")
        .replace(/[\s_-]/g, "");

const hasAnyRole = (roles, allowedRoles) => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    if (!Array.isArray(roles)) return false;

    const normalized = roles.map(normalizeRole);
    return allowedRoles.some((r) => normalized.includes(normalizeRole(r)));
};

export default function ProtectedRoute({ allowedRoles = [], children }) {
    const { user, authReady } = useContext(AuthContext);
    const location = useLocation();

    // Wait until localStorage restore is done
    if (!authReady) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
                Loading...
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    // Wrong role
    const roles = user?.roles || [];
    if (!hasAnyRole(roles, allowedRoles)) {
        return <Navigate to="/access-denied" replace state={{ from: location.pathname }} />;
    }

    return children;
}
