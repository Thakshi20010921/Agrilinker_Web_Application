import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login(email, password);

            // Save JWT token
            localStorage.setItem("token", res.data.token);

            // Optional: save user info
            localStorage.setItem("roles", JSON.stringify(res.data.roles));
            localStorage.setItem("email", res.data.email);

            // Redirect after login
            navigate("/home");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="screen">
            <form className="card" onSubmit={submit}>
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <div className="error">{error}</div>}

                <button type="submit" className="btn-primary">
                    Login
                </button>

                <button
                    type="button"
                    className="btn-light"
                    onClick={() => navigate("/")}
                >
                    Back
                </button>
            </form>
        </div>
    );
}
