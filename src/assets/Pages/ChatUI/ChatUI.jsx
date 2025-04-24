import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { BsEmojiSmile } from "react-icons/bs";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";

const ChatUI = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const db = getDatabase();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!selectedUser) return;

    const chatId =
      currentUser.uid > selectedUser.uid
        ? `${currentUser.uid}_${selectedUser.uid}`
        : `${selectedUser.uid}_${currentUser.uid}`;

    const msgRef = ref(db, `messages/${chatId}`);

    onValue(msgRef, (snapshot) => {
      const msgList = [];
      snapshot.forEach((item) => {
        msgList.push(item.val());
      });
      setMessages(msgList);
    });
  }, [selectedUser]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const chatId =
      currentUser.uid > selectedUser.uid
        ? `${currentUser.uid}_${selectedUser.uid}`
        : `${selectedUser.uid}_${currentUser.uid}`;

    const msgRef = ref(db, `messages/${chatId}`);
    const newMsg = {
      senderId: currentUser.uid,
      receiverId: selectedUser.uid,
      text: message,
      timestamp: Date.now(),
    };

    push(msgRef, newMsg);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 max-w-[60%] p-2 rounded-lg ${
              msg.senderId === currentUser.uid
                ? "bg-purple-600 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center p-2 border-t">
        <BsEmojiSmile className="text-2xl mr-2 cursor-pointer" />
        <FaPaperclip className="text-2xl mr-2 cursor-pointer" />
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full outline-none"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-full"
          onClick={handleSendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatUI;