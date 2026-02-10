// src/pages/LoginFertilizer.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // API call to login
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function LoginFertilizer() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(email, password); // API call

      const token = res?.data?.token;
      const roles = res?.data?.roles || [];
      const userEmail = res?.data?.email || email;
      const userId = res?.data?.id || res?.data?.userId || null;

      if (!token) throw new Error("Token not found in response");

      // Save token & roles to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("email", userEmail);

      // Update global AuthContext
      loginUser({ email: userEmail, roles, id: userId }, token);

      // Check Fertilizer Supplier role
      const hasSupplier = roles.includes("FERTILIZERSUPPLIER");
      if (!hasSupplier) {
        toast.error(
          "You are not registered as a Fertilizer Supplier. Please update your account roles."
        );
        navigate("/"); // redirect to home or account edit page
        return;
      }

      // ✅ User is a Fertilizer Supplier (alone or with other roles)
      navigate("/fertilizer-dashboard");
      toast.success("Login successful! Redirecting to Fertilizer Dashboard 🎉");
    } catch (err) {
      // If login fails (user not registered or invalid credentials)
      toast.error(
        "Invalid email or password. If you are not registered, please register first."
      );
      navigate("/register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <form className="card" onSubmit={submit}>
        <h2>Fertilizer Supplier Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

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
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          )}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="btn-light"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>
  );
}
