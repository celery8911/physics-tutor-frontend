import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary-500' : 'bg-gray-600'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col gap-2 max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Image if present */}
        {message.image && (
          <div className="rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={message.image}
              alt="Uploaded"
              className="max-w-full h-auto max-h-64 object-contain"
            />
          </div>
        )}

        {/* Text Content */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary-500 text-white rounded-tr-sm'
              : 'bg-gray-100 text-gray-900 rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <div className="text-sm leading-relaxed whitespace-pre-wrap break-words text-white">
              {message.content}
            </div>
          ) : (
            <div className="text-sm leading-relaxed markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  // 段落
                  p: ({ children }: { children?: React.ReactNode }) => (
                    <p className="mb-3 last:mb-0 leading-7">{children}</p>
                  ),
                  // 标题
                  h1: ({ children }: { children?: React.ReactNode }) => (
                    <h1 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h1>
                  ),
                  h2: ({ children }: { children?: React.ReactNode }) => (
                    <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>
                  ),
                  h3: ({ children }: { children?: React.ReactNode }) => (
                    <h3 className="text-sm font-bold mb-2 mt-3 first:mt-0">{children}</h3>
                  ),
                  // 粗体
                  strong: ({ children }: { children?: React.ReactNode }) => (
                    <strong className="font-bold text-gray-900">{children}</strong>
                  ),
                  // 列表 - 移除项目符号，因为 AI 回复已经包含了符号（如 • A.）
                  ul: ({ children }: { children?: React.ReactNode }) => (
                    <ul className="list-none pl-0 mb-3 space-y-1">{children}</ul>
                  ),
                  ol: ({ children }: { children?: React.ReactNode }) => (
                    <ol className="list-none pl-0 mb-3 space-y-1">{children}</ol>
                  ),
                  li: ({ children }: { children?: React.ReactNode }) => (
                    <li className="leading-7 pl-0">{children}</li>
                  ),
                  // 代码
                  code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode; [key: string]: any }) =>
                    inline ? (
                      <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-gray-200 p-3 rounded text-xs font-mono my-3 overflow-x-auto" {...props}>
                        {children}
                      </code>
                    ),
                  // 换行
                  br: () => <br className="my-1" />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-400 px-2">
          {message.timestamp.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};
