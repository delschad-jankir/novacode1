import React from 'react';
import { useTheme } from 'next-themes'; // Importing useTheme to manage dark/light mode
import { Send } from 'lucide-react'; // Importing the Send icon

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme(); // Get the current theme

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md h-full shadow-lg">
      <div
        className={`h-full flex flex-col p-4 border-l ${
          theme === 'dark'
            ? 'bg-black text-white border-gray-700'
            : 'bg-white text-black border-gray-200'
        }`}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <button
            aria-label="Close Chat"
            className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex-grow mt-4 overflow-y-auto">
          {/* Chat content goes here */}
          <p>Type your question about the codebase.</p>
          {/* You can add more chat content or integrate a chat API here */}
        </div>
        {/* Input Field */}
        <div className="border-t pt-2 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className={`flex-grow p-2 rounded-full focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-black'
            }`}
          />
          <button
            aria-label="Send Message"
            className="ml-2 p-2 rounded-full focus:outline-none"
            style={{
              backgroundColor: theme === 'dark' ? '#333' : '#ddd',
              color: theme === 'dark' ? '#ffffff' : '#000000',
            }}
          >
            <Send size={20} color={theme === 'dark' ? '#ffffff' : '#000000'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
