import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        localStorage.removeItem("email");

        navigate("/login");
    };

    return (
        <div style={{ position: "relative" }}>
            {/* Avatar */}
            <span
                className="text-3xl text-white hover:text-green-300 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                👤
            </span>

            {/* Dropdown */}
            {open && (
                <div className="user-dropdown">
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
}
