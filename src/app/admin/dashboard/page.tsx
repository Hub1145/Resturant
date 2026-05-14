"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin");
    }
  }, [router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      setMessage("Password updated successfully!");
      setNewPassword("");
      setCurrentPassword("");
    } else {
      setMessage("Failed to update password. Check current password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter">ADMIN <span className="text-blue-500">DASHBOARD</span></h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors mb-4"
                  placeholder="Current password"
                  required
                />
                <label className="block text-sm font-medium text-zinc-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="New password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                Save Password
              </button>
              {message && <p className="text-sm text-blue-400">{message}</p>}
            </form>
          </div>

          <div className="p-6 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-2 text-zinc-400">
              <p>Total Reservations: <span className="text-white">0</span></p>
              <p>Menu Items: <span className="text-white">5</span></p>
              <p>Website Visits: <span className="text-white">1,240</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
