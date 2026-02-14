import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const normalizeRole = (role) =>
    String(role || "")
        .toUpperCase()
        .replace(/^ROLE_/, "")
        .replace(/[\s_-]/g, "");

const hasAnyRole = (roles, allowedRoles) => {
    // If allowedRoles empty -> any logged-in user allowed
    if (!allowedRoles || allowedRoles.length === 0) return true;

    if (!Array.isArray(roles)) return false;

    const normalized = roles.map(normalizeRole);
    return allowedRoles.some((r) => normalized.includes(normalizeRole(r)));
};

export default function ProtectedRoute({ allowedRoles = [], children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // 1) Not logged in -> go login and remember where they wanted to go
    if (!user) {
        return (
            <Navigate to="/login" replace state={{ from: location.pathname }} />
        );
    }

    const roles = user?.roles || [];

    // 2) Logged in but wrong role -> show Access Denied
    if (!hasAnyRole(roles, allowedRoles)) {
        return (
            <Navigate
                to="/access-denied"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    // 3) Allowed
    return children;
}
