import React, { useState } from 'react';
import { Button, Input, Card, Spin, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { chatWithVolcano, Message } from '../services/volcanoService';

const { TextArea } = Input;

const VolcanoDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好！我是高小报答疑小助手，有什么可以帮您的吗？' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithVolcano(updatedMessages);
      setMessages([...updatedMessages, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error:', error);
      message.error('请求失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Spin size="small" />
              </div>
            </div>
          )}
        </div>

        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入您的问题..."
              autoSize={{ minRows: 2, maxRows: 6 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              type="primary" 
              onClick={handleSend}
              loading={loading}
              icon={<SendOutlined />}
              className="flex items-center justify-center"
              style={{
                width: '44px',
                height: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
                borderRadius: '8px',
                alignSelf: 'flex-end',
                marginBottom: '4px'
              }}
            />
          </div>
          
          <div className="text-xs text-gray-400 text-center mt-2">
            提示：Shift + Enter 换行，Enter 发送消息
          </div>
        </div>
      </div>
  );
};

export default VolcanoDemo;
