import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="screen">
            <div className="card">
                <div className="logo">A</div>

                <h1>Welcome to AgriLinker</h1>
                <p>Connecting Farmers, Buyers & Suppliers</p>

                <button
                    className="btn-light"
                    onClick={() => navigate("/login")}
                >
                    Login to Your Account
                </button>

                <button
                    className="btn-primary"
                    onClick={() => navigate("/register")}
                >
                    Create New Account
                </button>

                <div className="features">
                    <span>🌱 Fresh Produce</span>
                    <span>✔ Direct Trade</span>
                    <span>👤 Verified Users</span>
                </div>
            </div>
        </div>
    );
}
