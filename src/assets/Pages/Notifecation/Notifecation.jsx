import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import moment from "moment";

// Firebase notification data
const Notifecation = () => {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const notificationsRef = ref(db, "notifications/");
    
    onValue(notificationsRef, (snapshot) => {
      let notificationArray = [];
      snapshot.forEach((item) => {
        notificationArray.push({ ...item.val(), id: item.key });
      });
      setNotifications(notificationArray);
    });
  }, []);

  // Filtered notifications based on search input
  const filtered = notifications.filter((note) =>
    note.message.toLowerCase().includes(search.toLowerCase())
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
                key={note.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{note.message}</span>
                  <span className="text-xs text-gray-500">
                    {moment(note.timestamp).fromNow()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifecation;