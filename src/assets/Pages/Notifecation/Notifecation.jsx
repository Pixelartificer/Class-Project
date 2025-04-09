import React, { useState } from "react";
import { FaBell } from "react-icons/fa";

// Sample notifications
const notifications = [
  "Your order has been shipped.",
  "New comment on your post.",
  "Password changed successfully.",
  "Your subscription is expiring soon.",
  "New message from John.",
  "Your profile was viewed 10 times today.",
  "You have a new follower: Sarah.",
  "System update completed successfully.",
  "Reminder: Meeting with Alex at 3 PM.",
  "Promo alert: Get 20% off on your next order!",
  "Friend request received from Michael.",
  
];

const Notifecation = () => {
    const [search, setSearch] = useState("");

    const filtered = notifications.filter((note) =>
      note.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <FaBell className="text-xl text-gray-600" />
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Notification List */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((note, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                {note}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifecation