import React from 'react';
import { FaEllipsisV, FaSearch, FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';

const ChatUI = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md grid grid-cols-12 gap-4">
        
        {/* Sidebar */}
        <div className="col-span-3 p-4 border-r">
          {/* Search bar */}
          <div className="flex items-center mb-4">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-1 border rounded-full focus:outline-none text-sm"
            />
            <FaEllipsisV className="text-gray-500 ml-2" />
          </div>

          {/* Groups */}
          <h3 className="text-sm font-semibold mb-2">Groups</h3>
          <div className="bg-white rounded-md shadow-sm p-3 space-y-3 mb-6">
            {[
              { name: 'Friends Reunion', msg: 'Hi Guys, Wassup!', img: 'https://via.placeholder.com/40' },
              { name: 'Friends Forever', msg: 'Good to see you.', img: 'https://via.placeholder.com/40' },
              { name: 'Crazy Cousins', msg: 'What plans today?', img: 'https://via.placeholder.com/40' },
            ].map((group, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={group.img} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">{group.name}</p>
                    <p className="text-xs text-gray-500">{group.msg}</p>
                  </div>
                </div>
                <FaEllipsisV className="text-gray-400 text-sm" />
              </div>
            ))}
          </div>

          {/* Friends */}
          <h3 className="text-sm font-semibold mb-2">Friends</h3>
          <div className="bg-white rounded-md shadow-sm p-3 space-y-3">
            {[
              { name: 'Raghav', msg: 'Dinner?', img: 'https://via.placeholder.com/40' },
              { name: 'Swathi', msg: 'Sure!', img: 'https://via.placeholder.com/40', online: true },
              { name: 'Kiran', msg: 'Hi....', img: 'https://via.placeholder.com/40' },
              { name: 'Tejeshwini C', msg: 'I will call him today.', img: 'https://via.placeholder.com/40' },
            ].map((friend, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={friend.img} alt="" className="w-10 h-10 rounded-full" />
                    {friend.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{friend.name}</p>
                    <p className="text-xs text-gray-500">{friend.msg}</p>
                  </div>
                </div>
                <FaEllipsisV className="text-gray-400 text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-9 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <img src="https://via.placeholder.com/40" alt="Swathi" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold">Swathi</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <FaEllipsisV className="text-gray-500" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Received messages */}
            <div className="max-w-sm bg-gray-100 p-2 rounded-lg text-sm">Hey There !</div>
            <p className="text-xs text-gray-400 ml-2">Today, 2:01pm</p>

            <div className="max-w-sm bg-gray-100 p-2 rounded-lg text-sm">How are you doing?</div>
            <p className="text-xs text-gray-400 ml-2">Today, 2:02pm</p>

            {/* Sent messages */}
            <div className="text-right">
              <div className="inline-block bg-purple-700 text-white p-2 rounded-lg text-sm">Hello...</div>
              <p className="text-xs text-gray-400">Today, 2:12pm</p>
            </div>

            <div className="text-right">
              <div className="inline-block bg-purple-700 text-white p-2 rounded-lg text-sm">I am good and how about you?</div>
              <p className="text-xs text-gray-400">Today, 2:13pm</p>
            </div>

            {/* Received message */}
            <div className="max-w-sm bg-gray-100 p-2 rounded-lg text-sm">
              I am doing well. Can we meet up tomorrow?
            </div>
            <p className="text-xs text-gray-400 ml-2">Today, 2:13pm</p>

            {/* Sent message */}
            <div className="text-right">
              <div className="inline-block bg-purple-700 text-white p-2 rounded-lg text-sm">Sure!</div>
              <p className="text-xs text-gray-400">Today, 2:14pm</p>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t p-4 flex items-center gap-3">
            <FaSmile className="text-gray-500 text-lg" />
            <FaPaperclip className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none text-sm"
            />
            <button className="bg-purple-700 text-white p-2 rounded-full">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;