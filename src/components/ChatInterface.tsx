import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { physicsTutorAPI } from '../services/api';
import { Loader2 } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string, image?: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      image,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await physicsTutorAPI.askQuestion({
        problemText: text || undefined,
        imageBase64: image || undefined,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，发生了错误。请稍后再试。',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-2xl">
                <h1 className="text-4xl font-medium text-gray-900 mb-6">物理解题助手</h1>
                <p className="text-lg text-gray-600 mb-8">
                  上传物理题目图片或输入文字，获得详细的解答和讲解
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="text-2xl mb-2">📝</div>
                    <h3 className="font-medium text-gray-900 mb-1">输入题目</h3>
                    <p className="text-sm text-gray-600">直接输入物理题目文字描述</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="text-2xl mb-2">📷</div>
                    <h3 className="font-medium text-gray-900 mb-1">上传图片</h3>
                    <p className="text-sm text-gray-600">支持拍照或上传题目图片</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="text-2xl mb-2">💡</div>
                    <h3 className="font-medium text-gray-900 mb-1">详细解析</h3>
                    <p className="text-sm text-gray-600">答案、考点、步骤一应俱全</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 py-8">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};
