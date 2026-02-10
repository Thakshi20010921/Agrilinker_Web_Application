// src/pages/LoginFertilizer.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // your API function
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
      const res = await login(email, password);

      const token = res?.data?.token;
      const roles = res?.data?.roles || [];
      const userEmail = res?.data?.email || email;
      const userId = res?.data?.id || res?.data?.userId || null;

      if (!token) throw new Error("Token not found in response");

      // Save token/roles/email
      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("email", userEmail);

      // Update AuthContext
      loginUser({ email: userEmail, roles, id: userId }, token);

      toast.success("Login successful 🎉");

      // Check Fertilizer Supplier role combinations
      const hasSupplier = roles.includes("FERTILIZERSUPPLIER");
      const hasFarmer = roles.includes("FARMER");
      const hasBuyer = roles.includes("BUYER");

      if (!hasSupplier) {
        toast.error(
          "You are not registered as a Fertilizer Supplier. Please edit your account."
        );
        navigate("/"); // redirect to homepage or account edit page
        return;
      }

      // ✅ Allowed combinations: supplier alone or supplier + farmer/buyer
      navigate("/fertilizer-dashboard");
    } catch (err) {
      // If login fails → maybe user not registered
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
