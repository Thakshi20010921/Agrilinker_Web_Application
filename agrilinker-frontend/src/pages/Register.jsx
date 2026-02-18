import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        telephone: "",
        address: "",
        roles: [],
    });

    const [error, setError] = useState("");

    // Toggle role selection
    const toggleRole = (role) => {
        setForm((prev) => ({
            ...prev,
            roles: prev.roles.includes(role)
                ? prev.roles.filter((r) => r !== role)
                : [...prev.roles, role],
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        // Frontend validation
        if (
            !form.fullName ||
            !form.email ||
            !form.password ||
            !form.telephone ||
            !form.address
        ) {
            setError("All fields are required");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (!/^(?:0|\+94)7\d{8}$/.test(form.telephone)) {
            setError("Telephone must be 0771234567 or +94771234567");
            return;
        }

        if (form.roles.length === 0) {
            setError("Please select at least one role");
            return;
        }

        try {
            await register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                telephone: form.telephone,
                address: form.address,
                roles: form.roles,
            });

            toast.success("Registration completed! Please log in.");
            navigate("/login");

        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (typeof err.response?.data === "string") {
                setError(err.response.data);
            } else {
                setError("Registration failed");
            }

            toast.error("Registration failed");
        }
    };

    return (
        <div className="screen">
            <form className="card wide" onSubmit={submit}>
                <h2>Create Account</h2>

                <input
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                    }
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    required
                />

                <input
                    placeholder="Telephone (0771234567)"
                    value={form.telephone}
                    onChange={(e) =>
                        setForm({ ...form, telephone: e.target.value })
                    }
                    required
                />

                <input
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password (min 8 characters)"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    required
                />

                {/* Role Selection */}
                <div className="roles" style={{ marginTop: "10px" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={form.roles.includes("FARMER")}
                            onChange={() => toggleRole("FARMER")}
                        />{" "}
                        Farmer
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={form.roles.includes("BUYER")}
                            onChange={() => toggleRole("BUYER")}
                        />{" "}
                        Buyer
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={form.roles.includes("FERTILIZERSUPPLIER")}
                            onChange={() =>
                                toggleRole("FERTILIZERSUPPLIER")
                            }
                        />{" "}
                        Fertilizer Supplier
                    </label>
                </div>



                {error && (
                    <div className="error" style={{ marginTop: "10px" }}>
                        {error}
                    </div>
                )}

                <button type="submit" className="btn-primary">
                    Create Account
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
