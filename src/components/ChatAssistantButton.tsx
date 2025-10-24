import React, { useState } from 'react';
import { RobotOutlined } from '@ant-design/icons';
import icon from '../../assets/icon.png';
import VolcanoDemo from '../pages/VolcanoDemo';
import './ChatAssistantButton.css';

const ChatAssistantButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="chat-assistant-button fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg z-50 hover:shadow-xl transition-all duration-300 overflow-hidden"
        style={{
          background: `white url(${icon}) center/cover no-repeat`,
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          padding: 0,
          cursor: 'pointer',
          outline: 'none',
        }}
      />
      
      <div 
        className={`fixed right-8 z-50 transition-all duration-300 ease-in-out transform ${isModalOpen ? 'bottom-24 opacity-100 scale-100' : 'bottom-8 opacity-0 scale-95 pointer-events-none'}`}
        style={{
          width: '380px',
          height: '500px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          transformOrigin: 'bottom right',
        }}
      >
        <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <RobotOutlined className="text-blue-500" />
              </div>
              <span className="font-medium text-gray-800">高小报答疑小助手</span>
            </div>
            <button 
              onClick={handleCancel}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="h-full">
              <VolcanoDemo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAssistantButton;
