import React from 'react';
import {
  FaUserEdit,
  FaCommentDots,
  FaCamera,
  FaQuestionCircle,
  FaKey,
  FaRegCircle,
  FaTrash
} from 'react-icons/fa';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Profile Settings</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-bold">A B M Shawon Islam</h3>
                <p className="text-gray-500 text-sm">Stay home stay safe</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaUserEdit /> Edit Profile Name
              </li>
              <li className="flex items-center gap-3">
                <FaCommentDots /> Edit Profile Status Info
              </li>
              <li className="flex items-center gap-3">
                <FaCamera /> Edit Profile Photo
              </li>
              <li className="flex items-center gap-3">
                <FaQuestionCircle /> Help
              </li>
            </ul>
            <div className="text-center text-gray-400 text-xs mt-6">Chat App</div>
          </div>

          {/* Account Settings */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Account Settings</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaKey /> Change Password
              </li>
              <li className="flex items-center gap-3">
                <FaRegCircle /> Theme
              </li>
              <li className="flex items-center gap-3 text-red-600">
                <FaTrash /> Delete Account
              </li>
            </ul>
            <div className="text-center text-gray-400 text-xs mt-6">Chat App</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;