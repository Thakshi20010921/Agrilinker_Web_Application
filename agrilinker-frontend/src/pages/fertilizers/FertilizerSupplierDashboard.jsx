import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const FertilizerSupplierDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Redirect to login if not logged in
    if (!user || !token) {
      navigate("/login");
      return;
    }

    // 2️⃣ Check if user has supplier role
    const roles = Array.from(user.roles || []);
    const isSupplier =
      roles.includes("FERTILIZERSUPPLIER") ||
      (roles.includes("FERTILIZERSUPPLIER") && roles.includes("BUYER")) ||
      (roles.includes("FERTILIZERSUPPLIER") && roles.includes("FARMER")) ||
      (roles.includes("FERTILIZERSUPPLIER") &&
        roles.includes("FARMER") &&
        roles.includes("BUYER"));

    if (!isSupplier) {
      alert(
        "You are not registered as a Fertilizer Supplier. Please go to your account and update your roles."
      );
      navigate("/"); // Redirect to landing or account page
    }
  }, [user, token, navigate]);

  return (
    <div>
      <h1>Fertilizer Supplier Dashboard</h1>
      <p>Welcome, {user?.fullName}</p>
      {/* Dashboard content here */}
    </div>
  );
};

export default FertilizerSupplierDashboard;
