import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AccessDenied() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;

    // ✅ keep it clean (don't show raw path)
    const friendlyPageName = (() => {
        if (!from) return "this page";
        if (from.startsWith("/admin")) return "the admin area";
        if (from.startsWith("/support")) return "the support area";
        if (from.startsWith("/farmer")) return "the farmer dashboard";
        if (from.startsWith("/fertilizer")) return "the fertilizer supplier dashboard";
        return "this page";
    })();

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                    Access restricted
                </p>

                <h1 className="mt-3 text-2xl font-semibold text-gray-900">
                    You don’t have permission
                </h1>

                <p className="mt-3 text-gray-600 leading-relaxed">
                    Your account doesn’t have access to {friendlyPageName}. If you believe this is a mistake,
                    please contact support or switch to an account with the required access.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-2xl bg-gray-100 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 transition"
                    >
                        Go back
                    </button>

                    <Link
                        to="/go"
                        className="rounded-2xl bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                    >
                        Go to dashboard
                    </Link>

                    <Link
                        to="/contact-us"
                        className="rounded-2xl border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Contact support
                    </Link>
                </div>
            </div>
        </div>
    );
}
