import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8081/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (e) {
        setError("Profile not found or token expired.");
      }
    };
    load();
  }, []);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!profile) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white border rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-800 mb-4">My Profile</h1>

        <div className="space-y-3 text-gray-700">
          <div><b>Full Name:</b> {profile.fullName}</div>
          <div><b>Email:</b> {profile.email}</div>
          <div><b>Role:</b> {profile.roles?.join(", ")}</div>
          <div><b>Telephone:</b> {profile.telephone || "-"}</div>
          <div><b>Address:</b> {profile.address || "-"}</div>
          <div className="text-sm text-gray-500">
            <b>Created:</b> {profile.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
}
