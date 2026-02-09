import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
const { loginUser } = useContext(AuthContext);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await login(email, password);

localStorage.setItem("token", res.data.token);
localStorage.setItem("roles", JSON.stringify(res.data.roles));
localStorage.setItem("email", res.data.email);

loginUser({ email: res.data.email, roles: res.data.roles }, res.data.token);

toast.success("Login successful 🎉");
navigate("/home");

        } catch (err) {
            toast.error("Invalid email or password");
        } finally {
            setLoading(false);
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

                {/* Password with eye toggle */}
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {password && (
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
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
