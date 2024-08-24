'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // Importing the MessageCircle icon
import { useTheme } from 'next-themes'; // Assuming you're using next-themes for theme management
import ChatModal from '@/components/ChatModal';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme(); // Get the current theme (dark or light)
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage modal visibility

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <div className="relative min-h-screen">
      <main>{children}</main>
      {/* Fixed Icon */}
      <div className="fixed bottom-8 right-8">
        <button
          aria-label="Message"
          className="p-3 rounded-full focus:outline-none"
          style={{
            backgroundColor: 'transparent', // Fully transparent background
            color: theme === 'dark' ? '#ffffff' : '#000000', // Icon color based on theme
            border: `2px solid ${theme === 'dark' ? '#ffffff' : '#000000'}` // Border color based on theme
          }}
          onClick={openChat}
        >
          <MessageCircle size={32} /> {/* Use the MessageCircle icon */}
        </button>
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
};

export default Layout;
