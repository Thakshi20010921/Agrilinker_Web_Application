import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const normalizeRole = (role) =>
  String(role || "")
    .toUpperCase()
    .replace(/^ROLE_/, "")
    .replace(/[_\s-]/g, "");

const toRoleList = (rawRoles) => {
  if (Array.isArray(rawRoles)) return rawRoles;
  if (typeof rawRoles === "string") return [rawRoles];
  return [];
};

const hasAnyAllowedRole = (roles) => {
  const list = toRoleList(roles).map(normalizeRole);

  // your valid roles
  const allowed = ["ADMIN", "FARMER", "BUYER", "FERTILIZERSUPPLIER"];

  return list.some((r) => allowed.includes(r));
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation(); //  to read "from"
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
      const roles = toRoleList(res?.data?.roles);
      const userEmail = res?.data?.email || email;
      const userId = res?.data?.id || res?.data?.userId || null;

      if (!token) throw new Error("Token not found in response");
      console.log("FULL LOGIN RESPONSE:", res.data);


      //  store user + token
      loginUser(
        {
          email: userEmail,
          roles,
          id: userId,
        },
        token
      );


      /*Dewmini start */
      localStorage.setItem("email", userEmail);

      if (roles && roles.length > 0) {
        const roleList = roles.map(r => normalizeRole(r));

        let roleToSave;

        // 1. give first for fertilizer supplier
        if (roleList.includes("FERTILIZERSUPPLIER")) {
          roleToSave = "FERTILIZERSUPPLIER";
        }
        // 2. otherwise get list's firstone
        else {
          roleToSave = roleList[0];
        }

        localStorage.setItem("role", roleToSave);
      }
      /*Dewmini closed */
      toast.success("Login successful 🎉");
      // if roles are not any of these => block
      if (!hasAnyAllowedRole(roles)) {
        toast.error("Access denied");
        navigate("/", { replace: true });
        return;
      }

      //  Industry: go back to intended page OR role dashboard
      const from = location.state?.from;
      navigate(from ? from : "/go", { replace: true });
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
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </form>
    </div>
  );
}
